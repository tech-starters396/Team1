from django.urls import path
from rest_framework_simplejwt.views import (
    TokenRefreshView,
)
from .views import HealthCheckView, CurrentUserView, RoleAwareLoginView, SignupView, get_jobs, job_detail

urlpatterns = [
    path('health/', HealthCheckView.as_view(), name='health-check'),
    path('companies/', get_jobs, name='get_jobs'),
    path('companies/<int:pk>/', job_detail, name='job_detail'),
    path('auth/login/', RoleAwareLoginView.as_view(), name='role_aware_login'),
    path('auth/signup/', SignupView.as_view(), name='signup'),
    path('auth/me/', CurrentUserView.as_view(), name='current_user'),
    path('token/', RoleAwareLoginView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]
