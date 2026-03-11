from django.urls import path
from .views import company_list, health_check

urlpatterns = [
    path('companies/', company_list),
    path('health/', health_check),
]