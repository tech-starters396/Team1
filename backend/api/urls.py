from django.urls import path
from .views import company_list, joblisting_list, health_check

urlpatterns = [
    path('companies/', company_list),
    path('health/', health_check),
    path('joblistings/', joblisting_list),
]