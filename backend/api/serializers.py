from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth.models import User
from .models import JobListing


class UserSerializer(serializers.Serializer):
    id = serializers.IntegerField()
    username = serializers.CharField()
    email = serializers.EmailField(allow_blank=True)
    is_staff = serializers.BooleanField()
    is_superuser = serializers.BooleanField()


class RoleAwareTokenObtainPairSerializer(TokenObtainPairSerializer):
    role = serializers.ChoiceField(choices=['admin', 'user'], write_only=True)

    def validate(self, attrs):
        requested_role = attrs.pop('role')
        data = super().validate(attrs)

        if requested_role == 'admin' and not self.user.is_staff:
            raise serializers.ValidationError("This account is not an admin account.")

        if requested_role == 'user' and self.user.is_staff:
            raise serializers.ValidationError("Please use the admin login for this account.")

        data['user'] = UserSerializer(self.user).data
        return data


class SignupSerializer(serializers.Serializer):
    username = serializers.CharField(max_length=150)
    email = serializers.EmailField(required=False, allow_blank=True)
    password = serializers.CharField(write_only=True, min_length=8)
    password_confirm = serializers.CharField(write_only=True, min_length=8)

    def validate_username(self, value):
        if User.objects.filter(username=value).exists():
            raise serializers.ValidationError("That username is already taken.")
        return value

    def validate(self, attrs):
        if attrs['password'] != attrs['password_confirm']:
            raise serializers.ValidationError({"password_confirm": "Passwords do not match."})
        return attrs

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data.get('email', ''),
            password=validated_data['password'],
        )
        refresh = RefreshToken.for_user(user)
        return {
            'refresh': str(refresh),
            'access': str(refresh.access_token),
            'user': UserSerializer(user).data,
        }

class JobListingSerializer(serializers.ModelSerializer):
    is_saved_by_current_user = serializers.SerializerMethodField()
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
            'owner': {'required': False},
            'source_job': {'required': False},
        }

    def get_is_saved_by_current_user(self, obj):
        request = self.context.get('request')
        if not request or not request.user.is_authenticated:
            return False

        if obj.owner_id == request.user.id:
            return True

        if obj.owner_id is not None:
            return False

        return JobListing.objects.filter(
            owner=request.user,
            source_job=obj,
        ).exists()

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
