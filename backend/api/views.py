from rest_framework.decorators import api_view, permission_classes, parser_classes
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from rest_framework.parsers import JSONParser, MultiPartParser, FormParser
from rest_framework_simplejwt.views import TokenObtainPairView

from .models import JobListing
from .serializers import JobListingSerializer, RoleAwareTokenObtainPairSerializer, SignupSerializer, UserSerializer


# ✅ Health check
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


# ✅ GET ALL JOBS + CREATE NEW JOB
@api_view(['GET', 'POST'])
@permission_classes([AllowAny])
def get_jobs(request):

    if request.method == 'GET':
        jobs = JobListing.objects.all()
        serializer = JobListingSerializer(jobs, many=True)
        return Response(serializer.data)

    elif request.method == 'POST':
        if not request.user.is_authenticated:
            return Response({"detail": "Authentication credentials were not provided."}, status=status.HTTP_401_UNAUTHORIZED)

        if request.data.get('show_in_discover') is True and not request.user.is_staff:
            return Response({"detail": "Only admins can create discover page jobs."}, status=status.HTTP_403_FORBIDDEN)

        serializer = JobListingSerializer(data=request.data)  # ✅ FIXED
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['PUT', 'PATCH', 'DELETE'])
@permission_classes([AllowAny])
@parser_classes([JSONParser, MultiPartParser, FormParser])
def job_detail(request, pk):
    try:
        job = JobListing.objects.get(pk=pk)
    except JobListing.DoesNotExist:
        return Response(status=404)

    if not request.user.is_authenticated:
        return Response({"detail": "Authentication credentials were not provided."}, status=status.HTTP_401_UNAUTHORIZED)

    # ✅ HANDLE BOTH PUT + PATCH
    if request.method in ['PUT', 'PATCH']:
        if request.data.get('show_in_discover') is True and not request.user.is_staff:
            return Response({"detail": "Only admins can manage discover page jobs."}, status=status.HTTP_403_FORBIDDEN)
        serializer = JobListingSerializer(job, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=400)

    elif request.method == 'DELETE':
        if not request.user.is_staff:
            return Response({"detail": "Only admins can delete discover page jobs."}, status=status.HTTP_403_FORBIDDEN)
        job.delete()
        return Response(status=204)

    # ✅ GET SINGLE JOB
    if request.method == 'GET':
        serializer = JobListingSerializer(job)
        return Response(serializer.data)

    # ✅ UPDATE (STATUS, NOTES, FILES, ETC.)
    elif request.method == 'PUT':
        serializer = JobListingSerializer(job, data=request.data, partial=True)  # ✅ KEY FIX
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    # ✅ DELETE
    elif request.method == 'DELETE':
        job.delete()
        return Response({"message": "Deleted"}, status=status.HTTP_204_NO_CONTENT)
