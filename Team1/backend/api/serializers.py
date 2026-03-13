from rest_framework import serializers
from .models import JobListing

class JobListingSerializer(serializers.ModelSerializer):
    class Meta:
        model = JobListing
        fields = ['id', 'company_name', 'job_title', 'location', 'salary', 'status', 'description', 'notes', 'resume', 'cover_letter', 'created_at']