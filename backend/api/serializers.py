from rest_framework import serializers
from .models import JobListing

class JobListingSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = JobListing
        fields = '__all__'
        extra_kwargs = {
            'company': {'required': False},
            'job_title': {'required': False},
            'location': {'required': False},
            'job_type': {'required': False},
            'experience_level': {'required': False},
            'description': {'required': False},
            'salary': {'required': False},
            'apply_url': {'required': False},
            'key_responsibilities': {'required': False},
            'basic_qualifications': {'required': False},
            'preferred_qualifications': {'required': False},
        }

    def update(self, instance, validated_data):
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()
        return instance