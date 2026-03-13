from django.http import JsonResponse
from .models import Company, JobListing
from django.forms.models import model_to_dict


def company_list(request):
    companies = Company.objects.all()
    data = [model_to_dict(company) for company in companies]
    return JsonResponse(data, safe=False)

from django.http import JsonResponse
from .models import JobListing

def joblisting_list(request):
    jobs = JobListing.objects.select_related("company").all()

    data = []
    for job in jobs:
        data.append({
            "id": job.id,
            "title": job.title,
            "company": job.company.name,  #  NOW RETURNS NAME
            "location": job.location,
            "job_type": job.job_type,
            "experience_level": job.experience_level,
            "description": job.description,
            "application_deadline": job.application_deadline,
            "basic_qualifications": job.basic_qualifications,
            "preferred_qualifications": job.preferred_qualifications,
            "key_responsibilities": job.key_responsibilities,
            "apply_url": job.apply_url,
        })

    return JsonResponse(data, safe=False)


def health_check(request):
    return JsonResponse({
        "status": "healthy",
        "message": "Backend is running"
    })