from rest_framework import status
from rest_framework.decorators import api_view, parser_classes, permission_classes
from rest_framework.parsers import FormParser, JSONParser, MultiPartParser
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.views import TokenObtainPairView

from .models import JobListing
from .notifications import send_saved_job_reminder_email
from .serializers import (
    JobListingSerializer,
    RoleAwareTokenObtainPairSerializer,
    SignupSerializer,
    UserSerializer,
)


class HealthCheckView(APIView):
    permission_classes = [AllowAny]

    def get(self, request):
        return Response({"status": "healthy"}, status=status.HTTP_200_OK)


class RoleAwareLoginView(TokenObtainPairView):
    permission_classes = [AllowAny]
    serializer_class = RoleAwareTokenObtainPairSerializer


class CurrentUserView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        return Response(UserSerializer(request.user).data, status=status.HTTP_200_OK)


class SignupView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = SignupSerializer(data=request.data)
        if serializer.is_valid():
            return Response(serializer.save(), status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET', 'POST'])
@permission_classes([AllowAny])
@parser_classes([JSONParser, MultiPartParser, FormParser])
def get_jobs(request):
    if request.method == 'GET':
        jobs = JobListing.objects.filter(owner__isnull=True, show_in_discover=True).order_by('company', 'job_title')
        serializer = JobListingSerializer(jobs, many=True, context={'request': request})
        return Response(serializer.data)

    if not request.user.is_authenticated or not request.user.is_staff:
        return Response({"detail": "Only admins can create discover page jobs."}, status=status.HTTP_403_FORBIDDEN)

    serializer = JobListingSerializer(data=request.data, context={'request': request})
    if serializer.is_valid():
        serializer.save(owner=None, source_job=None, show_in_discover=True, status='new')
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['PUT', 'PATCH', 'DELETE'])
@permission_classes([AllowAny])
@parser_classes([JSONParser, MultiPartParser, FormParser])
def job_detail(request, pk):
    try:
        job = JobListing.objects.get(pk=pk, owner__isnull=True)
    except JobListing.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'DELETE':
        if not request.user.is_authenticated or not request.user.is_staff:
            return Response({"detail": "Only admins can delete discover page jobs."}, status=status.HTTP_403_FORBIDDEN)
        job.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

    if not request.user.is_authenticated or not request.user.is_staff:
        return Response({"detail": "Only admins can update discover page jobs."}, status=status.HTTP_403_FORBIDDEN)

    serializer = JobListingSerializer(job, data=request.data, partial=True, context={'request': request})
    if serializer.is_valid():
        serializer.save(owner=None, source_job=None, show_in_discover=True)
        return Response(serializer.data)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
@parser_classes([JSONParser, MultiPartParser, FormParser])
def tracker_jobs(request):
    if request.method == 'GET':
        jobs = JobListing.objects.filter(owner=request.user).order_by('-id')
        serializer = JobListingSerializer(jobs, many=True, context={'request': request})
        return Response(serializer.data)

    source_job_id = request.data.get('source_job')
    if source_job_id:
        try:
            source_job = JobListing.objects.get(pk=source_job_id, owner__isnull=True, show_in_discover=True)
        except JobListing.DoesNotExist:
            return Response({"detail": "That discover job could not be found."}, status=status.HTTP_404_NOT_FOUND)

        tracked_job, created = JobListing.objects.get_or_create(
            owner=request.user,
            source_job=source_job,
            defaults={
                'job_title': source_job.job_title,
                'company': source_job.company,
                'description': source_job.description,
                'key_responsibilities': source_job.key_responsibilities,
                'basic_qualifications': source_job.basic_qualifications,
                'preferred_qualifications': source_job.preferred_qualifications,
                'salary': source_job.salary,
                'job_type': source_job.job_type,
                'location': source_job.location,
                'experience_level': source_job.experience_level,
                'apply_url': source_job.apply_url,
                'show_in_discover': False,
                'status': 'saved',
            },
        )

        if not created and tracked_job.status == 'new':
            tracked_job.status = 'saved'
            tracked_job.save(update_fields=['status'])

        reminder_sent = send_saved_job_reminder_email(
            recipient_email=request.user.email,
            username=request.user.username,
            job_title=tracked_job.job_title,
            company=tracked_job.company,
        )
        serializer = JobListingSerializer(tracked_job, context={'request': request})
        response_status = status.HTTP_201_CREATED if created else status.HTTP_200_OK
        return Response(
            {
                'job': serializer.data,
                'already_saved': not created,
                'reminder_email_sent': reminder_sent,
            },
            status=response_status,
        )

    serializer = JobListingSerializer(data=request.data, context={'request': request})
    if serializer.is_valid():
        tracked_job = serializer.save(owner=request.user, source_job=None, show_in_discover=False)
        serializer = JobListingSerializer(tracked_job, context={'request': request})
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['PUT', 'PATCH', 'DELETE'])
@permission_classes([IsAuthenticated])
@parser_classes([JSONParser, MultiPartParser, FormParser])
def tracker_job_detail(request, pk):
    try:
        tracked_job = JobListing.objects.get(pk=pk, owner=request.user)
    except JobListing.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'DELETE':
        tracked_job.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

    serializer = JobListingSerializer(tracked_job, data=request.data, partial=True, context={'request': request})
    if serializer.is_valid():
        serializer.save(owner=request.user, source_job=tracked_job.source_job, show_in_discover=False)
        return Response(serializer.data)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
