from api.models import JobListing

def run():
    jobs = [
       {
            "company": "Amazon",
            "job_title": "Principal Delivery Consultant",
            "location": "USA",
            "job_type": "Full-time",
            "experience_level": "Mid",
            "salary": "$182,800 - $247,300/year",

            "description": """The Amazon Web Services Professional Services team is seeking a Delivery Consultant.

You will work with customers to design, implement, and manage AWS solutions that meet technical and business needs.""",

            "key_responsibilities": """Design scalable AWS solutions
Provide technical guidance
Collaborate with stakeholders
Act as a trusted advisor""",

            "basic_qualifications": """Bachelor’s degree in CS or related field
8+ years cloud experience
Experience with contact center platforms
Strong API experience""",

            "preferred_qualifications": """AWS certifications
Terraform or Python experience
Knowledge of security standards
Strong communication skills""",

            "apply_url": "https://amazon.jobs/en/jobs/3164960"
        },

        {
            "company": "Amazon",
            "job_title": "Data Center Operations Engineer",
            "location": "Ulsan, Korea",
            "job_type": "Full-time",
            "experience_level": "Entry",
            "salary": "$42,900/year",

            "description": """AWS Infrastructure Services manages global cloud infrastructure.

You will help maintain servers, networking, and data center operations.""",

            "key_responsibilities": """Maintain system reliability
Troubleshoot Linux servers
Replace hardware
Support 24/7 operations""",

            "basic_qualifications": """3+ years IT experience
Linux/Unix knowledge
Hardware troubleshooting skills""",

            "preferred_qualifications": """CCNA or Network+
Python or scripting skills
Project experience""",

            "apply_url": "https://amazon.jobs/en/jobs/3171349"
        },

        {
            "company": "Amazon",
            "job_title": "Operations Engineer",
            "location": "USA",
            "job_type": "Full-time",
            "experience_level": "Mid",
            "salary": "$68,900/year",

            "description": """As an Operations Engineer, you will manage large-scale engineering projects.

You will work with teams to build and improve distribution systems.""",

            "key_responsibilities": """Manage engineering projects
Collaborate with stakeholders
Improve system efficiency
Lead technical discussions""",

            "basic_qualifications": """Bachelor’s in Engineering
4+ years project experience
CAD knowledge""",

            "preferred_qualifications": """Master’s degree preferred
Lean/Six Sigma experience
Automation systems knowledge""",

            "apply_url": "https://amazon.jobs/en/jobs/2893081"
        },
{
    "company": "Google",
    "job_title": "Student Researcher (BS/MS) Winter/Summer 2026",
    "location": "USA",
    "job_type": "Internship",
    "experience_level": "Entry",
    "salary": "$90,000/year (estimated)",
    "description": "Work on advanced research projects in AI, systems, and data.",
    "key_responsibilities": "Conduct research\nAnalyze data\nCollaborate with teams\nPresent findings",
    "basic_qualifications": "Currently pursuing BS/MS\nProgramming experience",
    "preferred_qualifications": "ML or AI experience",
    "apply_url": "https://www.google.com/about/careers/applications/jobs/results/140245524367188678-student-researcher-bsms-wintersummer-2026"
},
{
    "company": "Google",
    "job_title": "Technical Program Manager III - Hardware",
    "location": "USA",
    "job_type": "Full-time",
    "experience_level": "Mid",
    "salary": "$135,000/year (estimated)",
    "description": "Manage hardware quality and supply chain programs.",
    "key_responsibilities": "Lead programs\nCoordinate teams\nTrack progress",
    "basic_qualifications": "Bachelor’s degree\nProgram management experience",
    "preferred_qualifications": "Hardware systems experience",
    "apply_url": "https://www.google.com/about/careers/applications/jobs/results/111277935574295238-technical-program-manager-iii-hardware-quality-and-reliability-supply-chain"
},
{
    "company": "Google",
    "job_title": "Technical Program Manager III (Duplicate Listing)",
    "location": "USA",
    "job_type": "Full-time",
    "experience_level": "Mid",
    "salary": "$135,000/year (estimated)",
    "description": "Manage engineering programs and cross-functional teams.",
    "key_responsibilities": "Lead projects\nManage timelines\nEnsure delivery",
    "basic_qualifications": "Program management experience",
    "preferred_qualifications": "Technical leadership",
    "apply_url": "https://www.google.com/about/careers/applications/jobs/results/111277935574295238-technical-program-manager-iii-hardware-quality-and-reliability-supply-chain"
},

# ---------------- MICROSOFT (3) ----------------
{
    "company": "Microsoft",
    "job_title": "Software Engineer (Entry)",
    "location": "USA",
    "job_type": "Full-time",
    "experience_level": "Entry",
    "salary": "$105,000/year (estimated)",
    "description": "Develop scalable applications and cloud services.",
    "key_responsibilities": "Build features\nFix bugs\nCollaborate",
    "basic_qualifications": "CS degree\nCoding skills",
    "preferred_qualifications": "Azure experience",
    "apply_url": "https://apply.careers.microsoft.com"
},
{
    "company": "Microsoft",
    "job_title": "Cloud Engineer (Entry)",
    "location": "USA",
    "job_type": "Full-time",
    "experience_level": "Entry",
    "salary": "$110,000/year (estimated)",
    "description": "Work on Microsoft cloud infrastructure.",
    "key_responsibilities": "Deploy systems\nMonitor services\nOptimize cloud",
    "basic_qualifications": "Cloud basics\nCS degree",
    "preferred_qualifications": "Azure certifications",
    "apply_url": "https://apply.careers.microsoft.com"
},
{
    "company": "Microsoft",
    "job_title": "Program Manager (Entry)",
    "location": "USA",
    "job_type": "Full-time",
    "experience_level": "Entry",
    "salary": "$100,000/year (estimated)",
    "description": "Coordinate product development teams.",
    "key_responsibilities": "Manage timelines\nCommunicate\nTrack progress",
    "basic_qualifications": "Bachelor’s degree",
    "preferred_qualifications": "Agile experience",
    "apply_url": "https://apply.careers.microsoft.com"
},

# ---------------- META (3) ----------------
{
    "company": "Meta",
    "job_title": "Software Engineer",
    "location": "USA",
    "job_type": "Full-time",
    "experience_level": "Entry",
    "salary": "$120,000/year (estimated)",
    "description": "Build large-scale social platforms.",
    "key_responsibilities": "Develop code\nOptimize systems\nCollaborate",
    "basic_qualifications": "CS degree\nData structures",
    "preferred_qualifications": "Frontend/backend frameworks",
    "apply_url": "https://www.metacareers.com/profile/job_details/998357492128826"
},
{
    "company": "Meta",
    "job_title": "Data Engineer",
    "location": "USA",
    "job_type": "Full-time",
    "experience_level": "Entry",
    "salary": "$115,000/year (estimated)",
    "description": "Build data pipelines and analytics systems.",
    "key_responsibilities": "ETL pipelines\nData modeling\nAnalytics",
    "basic_qualifications": "SQL\nPython",
    "preferred_qualifications": "Big data tools",
    "apply_url": "https://www.metacareers.com/profile/job_details/2486789151677735"
},
{
    "company": "Meta",
    "job_title": "Machine Learning Engineer",
    "location": "USA",
    "job_type": "Full-time",
    "experience_level": "Entry",
    "salary": "$130,000/year (estimated)",
    "description": "Develop ML models for Meta platforms.",
    "key_responsibilities": "Train models\nAnalyze data\nDeploy solutions",
    "basic_qualifications": "ML knowledge\nPython",
    "preferred_qualifications": "Deep learning",
    "apply_url": "https://www.metacareers.com/profile/job_details/1815340722398036"
},

# ---------------- TESLA (3) ----------------
{
    "company": "Tesla",
    "job_title": "Software Engineer - Inference Infrastructure",
    "location": "USA",
    "job_type": "Full-time",
    "experience_level": "Mid",
    "salary": "$140,000/year (estimated)",
    "description": "Build AI inference systems.",
    "key_responsibilities": "Develop ML systems\nOptimize infrastructure",
    "basic_qualifications": "Python/C++",
    "preferred_qualifications": "AI experience",
    "apply_url": "https://www.tesla.com/en_GB/careers/search/job/software-engineer-inference-infrastructure-222387"
},
{
    "company": "Tesla",
    "job_title": "System Software Engineer Intern",
    "location": "USA",
    "job_type": "Internship",
    "experience_level": "Entry",
    "salary": "$30/hour (estimated)",
    "description": "Work on graphics and system software.",
    "key_responsibilities": "Develop code\nDebug systems",
    "basic_qualifications": "Student in CS",
    "preferred_qualifications": "C++",
    "apply_url": "https://www.tesla.com/en_GB/careers/search/job/internship-system-software-engineer-graphics-summer-2026-258191"
},
{
    "company": "Tesla",
    "job_title": "Staff Software Engineer - Fintech",
    "location": "USA",
    "job_type": "Full-time",
    "experience_level": "Senior",
    "salary": "$160,000/year (estimated)",
    "description": "Build fintech systems for Tesla.",
    "key_responsibilities": "Lead engineering\nDesign systems",
    "basic_qualifications": "Extensive experience",
    "preferred_qualifications": "Fintech background",
    "apply_url": "https://www.tesla.com/en_GB/careers/search/job/staff-software-engineer-fintech-262628"
},

# ---------------- CISCO (3) ----------------
{
    "company": "Cisco",
    "job_title": "Software Engineer - Security Automation II",
    "location": "USA",
    "job_type": "Full-time",
    "experience_level": "Entry",
    "salary": "$105,000/year (estimated)",
    "description": "Build automation tools for security systems.",
    "key_responsibilities": "Develop scripts\nImprove security",
    "basic_qualifications": "Python\nNetworking",
    "preferred_qualifications": "Security tools",
    "apply_url": "https://careers.cisco.com/global/en/job/2000090"
},
{
    "company": "Cisco",
    "job_title": "Software Engineer - Full Stack I",
    "location": "USA",
    "job_type": "Full-time",
    "experience_level": "Entry",
    "salary": "$100,000/year (estimated)",
    "description": "Develop full-stack applications.",
    "key_responsibilities": "Frontend + backend development",
    "basic_qualifications": "JavaScript\nReact",
    "preferred_qualifications": "Cloud experience",
    "apply_url": "https://careers.cisco.com/global/en/job/2000087"
},
{
    "company": "Cisco",
    "job_title": "Software Engineer - Embedded Systems I",
    "location": "USA",
    "job_type": "Full-time",
    "experience_level": "Entry",
    "salary": "$100,000/year (estimated)",
    "description": "Work on embedded networking systems.",
    "key_responsibilities": "Develop firmware\nDebug hardware",
    "basic_qualifications": "C/C++",
    "preferred_qualifications": "Embedded systems",
    "apply_url": "https://careers.cisco.com/global/en/job/2000081"
},

# ---------------- PALO ALTO (3) ----------------
{
    "company": "Palo Alto Networks",
    "job_title": "Distinguished Engineer - AI",
    "location": "USA",
    "job_type": "Full-time",
    "experience_level": "Senior",
    "salary": "$180,000/year (estimated)",
    "description": "Lead AI transformation initiatives.",
    "key_responsibilities": "Drive AI strategy\nLead teams",
    "basic_qualifications": "Extensive experience",
    "preferred_qualifications": "AI leadership",
    "apply_url": "https://jobs.paloaltonetworks.com/en/job/santa-clara/distinguished-engineer-ai-first-transformation/47263/91666977792"
},
{
    "company": "Palo Alto Networks",
    "job_title": "IT Business Analyst - AI",
    "location": "USA",
    "job_type": "Full-time",
    "experience_level": "Mid",
    "salary": "$120,000/year (estimated)",
    "description": "Support AI-driven business systems.",
    "key_responsibilities": "Analyze systems\nImprove workflows",
    "basic_qualifications": "Business analysis",
    "preferred_qualifications": "AI tools",
    "apply_url": "https://jobs.paloaltonetworks.com/en/job/santa-clara/it-business-analyst-ai-driven-support/47263/91053595872"
},
{
    "company": "Palo Alto Networks",
    "job_title": "Principal Network Security Engineer",
    "location": "USA",
    "job_type": "Full-time",
    "experience_level": "Senior",
    "salary": "$160,000/year (estimated)",
    "description": "Design secure network systems.",
    "key_responsibilities": "Design architecture\nSecure systems",
    "basic_qualifications": "Security experience",
    "preferred_qualifications": "Cloud security",
    "apply_url": "https://jobs.paloaltonetworks.com/en/job/santa-clara/principal-network-security-engineer/47263/91053588816"
},

# ---------------- SNOWFLAKE (3) ----------------
{
    "company": "Snowflake",
    "job_title": "Solution Engineer",
    "location": "USA",
    "job_type": "Full-time",
    "experience_level": "Mid",
    "salary": "$120,000/year (estimated)",
    "description": "Help customers implement Snowflake solutions.",
    "key_responsibilities": "Support clients\nImplement solutions",
    "basic_qualifications": "SQL\nCloud",
    "preferred_qualifications": "Snowflake experience",
    "apply_url": "https://careers.snowflake.com"
},
{
    "company": "Snowflake",
    "job_title": "Software Engineer - Database",
    "location": "USA",
    "job_type": "Full-time",
    "experience_level": "Mid",
    "salary": "$135,000/year (estimated)",
    "description": "Develop database systems.",
    "key_responsibilities": "Optimize queries\nBuild systems",
    "basic_qualifications": "SQL\nDistributed systems",
    "preferred_qualifications": "Cloud",
    "apply_url": "https://careers.snowflake.com"
},
{
    "company": "Snowflake",
    "job_title": "Software Engineer Intern - AI/ML",
    "location": "USA",
    "job_type": "Internship",
    "experience_level": "Entry",
    "salary": "$35/hour (estimated)",
    "description": "Work on AI/ML features.",
    "key_responsibilities": "Train models\nAnalyze data",
    "basic_qualifications": "Python",
    "preferred_qualifications": "ML",
    "apply_url": "https://careers.snowflake.com"
},

# ---------------- CGI (3) ----------------
{
    "company": "CGI",
    "job_title": "Junior Software Developer",
    "location": "USA",
    "job_type": "Full-time",
    "experience_level": "Entry",
    "salary": "$85,000/year (estimated)",
    "description": "Develop enterprise applications.",
    "key_responsibilities": "Code\nTest\nDebug",
    "basic_qualifications": "CS degree",
    "preferred_qualifications": "Agile",
    "apply_url": "https://cgi.njoyn.com"
},
{
    "company": "CGI",
    "job_title": "IT Consultant",
    "location": "USA",
    "job_type": "Full-time",
    "experience_level": "Entry",
    "salary": "$90,000/year (estimated)",
    "description": "Support IT consulting services.",
    "key_responsibilities": "Client support\nSystem analysis",
    "basic_qualifications": "IT knowledge",
    "preferred_qualifications": "Consulting",
    "apply_url": "https://cgi.njoyn.com"
},
{
    "company": "CGI",
    "job_title": "Business Analyst",
    "location": "USA",
    "job_type": "Full-time",
    "experience_level": "Entry",
    "salary": "$88,000/year (estimated)",
    "description": "Analyze business systems.",
    "key_responsibilities": "Gather requirements\nAnalyze data",
    "basic_qualifications": "Business/IT degree",
    "preferred_qualifications": "Agile",
    "apply_url": "https://cgi.njoyn.com"
},

# ---------------- DATADOG (3) ----------------
{
    "company": "Datadog",
    "job_title": "Software Engineer",
    "location": "USA",
    "job_type": "Full-time",
    "experience_level": "Entry",
    "salary": "$115,000/year (estimated)",
    "description": "Build observability tools.",
    "key_responsibilities": "Develop features\nMonitor systems",
    "basic_qualifications": "Programming",
    "preferred_qualifications": "Cloud tools",
    "apply_url": "https://careers.datadoghq.com/detail/7728274/?gh_jid=7728274"
},
{
    "company": "Datadog",
    "job_title": "Backend Engineer",
    "location": "USA",
    "job_type": "Full-time",
    "experience_level": "Entry",
    "salary": "$120,000/year (estimated)",
    "description": "Develop backend services.",
    "key_responsibilities": "APIs\nScaling systems",
    "basic_qualifications": "Python/Go",
    "preferred_qualifications": "Distributed systems",
    "apply_url": "https://careers.datadoghq.com/detail/6572669/?gh_jid=6572669"
},
{
    "company": "Datadog",
    "job_title": "Site Reliability Engineer",
    "location": "USA",
    "job_type": "Full-time",
    "experience_level": "Entry",
    "salary": "$125,000/year (estimated)",
    "description": "Ensure system reliability.",
    "key_responsibilities": "Monitor uptime\nFix issues",
    "basic_qualifications": "Linux\nCloud",
    "preferred_qualifications": "SRE experience",
    "apply_url": "https://careers.datadoghq.com/detail/7375183/?gh_jid=7375183"
}
    ]

    for job in jobs:
        JobListing.objects.create(
            company=job["company"],
            job_title=job["job_title"],
            location=job["location"],
            job_type=job["job_type"],
            experience_level=job["experience_level"],
            salary=job["salary"],
            description=job["description"],
            key_responsibilities=job["key_responsibilities"],
            basic_qualifications=job["basic_qualifications"],
            preferred_qualifications=job["preferred_qualifications"],
            apply_url=job["apply_url"],
            status="New"
        )

    print("All jobs seeded successfully!")