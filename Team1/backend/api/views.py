from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from .models import JobListing
from .serializers import JobListingSerializer

# This class was missing, causing your ImportError
class HealthCheckView(APIView):
    permission_classes = [AllowAny]
    def get(self, request):
        return Response({"status": "healthy"}, status=status.HTTP_200_OK)

@api_view(['GET'])
@permission_classes([AllowAny])
def get_jobs(request):
    # Fetch all jobs from the PostgreSQL database
    jobs = JobListing.objects.all().order_by('-created_at')
    serializer = JobListingSerializer(jobs, many=True)
    return Response(serializer.data)