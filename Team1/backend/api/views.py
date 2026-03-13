from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from .models import JobListing
from .serializers import JobListingSerializer

class HealthCheckView(APIView):
    permission_classes = [AllowAny]
    def get(self, request):
        return Response({"status": "healthy"}, status=status.HTTP_200_OK)

@api_view(['GET', 'POST'])
@permission_classes([AllowAny])
def get_jobs(request):
    if request.method == 'GET':
        jobs = JobListing.objects.all().order_by('-created_at')
        serializer = JobListingSerializer(jobs, many=True)
        return Response(serializer.data)
        
    elif request.method == 'POST':
        serializer = JobListingSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# ADD THIS NEW BLOCK: Handles Updating (PUT) and Deleting
@api_view(['PUT', 'DELETE'])
@permission_classes([AllowAny])
def job_detail(request, pk):
    try:
        job = JobListing.objects.get(pk=pk)
    except JobListing.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'PUT':
        # partial=True allows us to only update the "status" field without needing to resend the entire job
        serializer = JobListingSerializer(job, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    elif request.method == 'DELETE':
        job.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)