from django.db import models

class JobListing(models.Model):
    job_title = models.CharField(max_length=200)
    company = models.CharField(max_length=200)

    description = models.TextField()
    key_responsibilities = models.TextField()
    basic_qualifications = models.TextField(blank=True, null=True)
    preferred_qualifications = models.TextField(blank=True, null=True)

    salary = models.CharField(max_length=100)
    job_type = models.CharField(max_length=50)
    location = models.CharField(max_length=100)
    experience_level = models.CharField(max_length=50)

    apply_url = models.URLField()

    resume = models.FileField(upload_to='resumes/', null=True, blank=True)
    cover_letter = models.FileField(upload_to='cover_letters/', null=True, blank=True)
    notes = models.TextField(blank=True)
    show_in_discover = models.BooleanField(default=True)

    STATUS_CHOICES = [
        ('new', 'New'),
        ('saved', 'Saved'),
        ('applied', 'Applied'),
        ('interview', 'Interview'),
    ]
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='saved')

    def __str__(self):
        return f"{self.job_title} at {self.company}"
