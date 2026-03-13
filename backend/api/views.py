from django.http import JsonResponse
from .models import Company
from django.forms.models import model_to_dict

def company_list(request):
    companies = Company.objects.all()
    data = [model_to_dict(company) for company in companies]
    return JsonResponse(data, safe=False)

from django.http import JsonResponse

def health_check(request):
    return JsonResponse({
        "status": "healthy",
        "message": "Backend is running"
    })