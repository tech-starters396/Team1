from api.models import Company, JobListing

def run():

    data = {
        "Amazon": [
            "Principal Delivery Consultant - Connect and Conversational AI, Amazon Connect Center of Delivery Excellence",
            "Principal ProServe Cloud Architect",
            "Operations Engineer"
        ],
        "Google": [
            "Student Researcher",
            "Software Engineer",
            "Technical Program Manager",
        ],
        "Microsoft": [
            "Software Engineer",
            "Data Scientist, Security",
            "Technical Support Engineer"
        ],
        "Meta": [
            "Software Engineer, Mechine Learning",
            "Software Engineer, Android",
            "Software Engineer"
        ],
        "Tesla": [
            "Staff Software Engineer, Fintech",
            "Desktop Support Technician",
            "System Software Engineer"
        ],
        "Cisco": [
            "Software Engineer Embedded/Network Systems I",
            "Software Engineer Security & Automation II",
            "Software Engineer Full Stack & Application Development I"
        ],
        "Palo Alto Networks": [
            "Distinguished Engineer - AI-First Transformation",
            "IT Business Analyst, AI-Driven Support",
            "Principal Network Security Engineer"
        ],
        "Datadog": [
            "Senior Sales Engineer",
            "Senior Security Analyst",
            "Staff Software Engineer"
        ],
        "Snowflake": [
            "Software Engineer",
            "Solution Engineer",
            "Software Engineer Intern"
        ],
        "CGI": [
            "Senior Database Engineer / Administrator",
            "Full Stack Developer",
            "Business Analyst"
        ],
    }

    for company_name, jobs in data.items():
        company, _ = Company.objects.get_or_create(
            name=company_name,
            industry="Technology",
            location="United States"
        )

        for title in jobs:
            JobListing.objects.get_or_create(
                company=company,
                title=title,
                location="United States",
                job_type="Full-time",
                experience_level="Mid",
                description=f"{title} role at {company_name}.",
                apply_url="https://example.com"
            )

    print("30 job listings created successfully!")