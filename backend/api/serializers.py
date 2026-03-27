from rest_framework import serializers
from .models import JobListing

class JobListingSerializer(serializers.ModelSerializer):
    _CREATE_DEFAULTS = {
        'key_responsibilities': '',
        'job_type': '',
        'experience_level': '',
        'apply_url': 'https://example.com/',
    }

    class Meta:
        model = JobListing
        fields = '__all__'
        extra_kwargs = {
            'company': {'required': False},
            'job_title': {'required': False},
            'location': {'required': False},
            'job_type': {'required': False},
            'experience_level': {'required': False},
            'description': {'required': False, 'allow_blank': True},
            'salary': {'required': False},
            'apply_url': {'required': False},
            'key_responsibilities': {'required': False, 'allow_blank': True},
            'basic_qualifications': {'required': False},
            'preferred_qualifications': {'required': False},
        }

    def create(self, validated_data):
        for field, default in self._CREATE_DEFAULTS.items():
            if not validated_data.get(field):
                validated_data[field] = default
        return super().create(validated_data)

    def update(self, instance, validated_data):
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()
        return instance