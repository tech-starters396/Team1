from django.db import models


class Company(models.Model):
    name = models.CharField(max_length=255)
    industry = models.CharField(max_length=255)
    location = models.CharField(max_length=255)

    def __str__(self):
        return self.name

    class Meta:
        verbose_name_plural = "Companies"


from django.db import models


class JobListing(models.Model):
    title = models.CharField(max_length=255)
    company = models.ForeignKey("Company", on_delete=models.CASCADE)
    location = models.CharField(max_length=255, blank=True, null=True)
    job_type = models.CharField(max_length=100, default="Full-Time")
    experience_level = models.CharField(max_length=100, default="Entry Level")

    description = models.TextField(blank=True, null=True)

    application_deadline = models.DateField(blank=True, null=True)
    basic_qualifications = models.TextField(blank=True, null=True)
    preferred_qualifications = models.TextField(blank=True, null=True)

    key_responsibilities = models.TextField(blank=True, null=True)

    apply_url = models.URLField(default="https://example.com")

    def __str__(self):
        return self.title