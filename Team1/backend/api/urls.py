from django.urls import path
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
from .views import HealthCheckView, get_jobs

urlpatterns = [
    path('health/', HealthCheckView.as_view(), name='health-check'),
    path('companies/', get_jobs, name='get_jobs'),
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]