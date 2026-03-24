from rest_framework.decorators import api_view, permission_classes, parser_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from rest_framework.parsers import MultiPartParser, FormParser

from .models import JobListing
from .serializers import JobListingSerializer


# ✅ Health check
class HealthCheckView(APIView):
    permission_classes = [AllowAny]

    def get(self, request):
        return Response({"status": "healthy"}, status=status.HTTP_200_OK)


# ✅ GET ALL JOBS + CREATE NEW JOB
@api_view(['GET', 'POST'])
@permission_classes([AllowAny])
def get_jobs(request):

    if request.method == 'GET':
        jobs = JobListing.objects.all()
        serializer = JobListingSerializer(jobs, many=True)
        return Response(serializer.data)

    elif request.method == 'POST':
        serializer = JobListingSerializer(data=request.data)  # ✅ FIXED
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['PUT', 'PATCH', 'DELETE'])
@permission_classes([AllowAny])
def job_detail(request, pk):
    try:
        job = JobListing.objects.get(pk=pk)
    except JobListing.DoesNotExist:
        return Response(status=404)

    # ✅ HANDLE BOTH PUT + PATCH
    if request.method in ['PUT', 'PATCH']:
        serializer = JobListingSerializer(job, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=400)

    elif request.method == 'DELETE':
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