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
},

# ---------------- APPLE / IBM / UBER / INTEL / SALESFORCE (15) ----------------
{
    "company": "Apple",
    "job_title": "Software Engineer, SAP Development Support",
    "location": "Austin Metro Area, Texas, United States",
    "job_type": "Full-time",
    "experience_level": "Mid",
    "salary": "$101,630 - $142,150",
    "description": "Join Apple's IS&T Enterprise Systems team to develop and support SAP applications and external non-SAP services. The role focuses on ABAP development, S/4HANA programming, SAP integrations, and production support for enterprise-scale systems.",
    "key_responsibilities": "Develop and support SAP and external application integrations\nBuild custom ABAP solutions and troubleshoot SAP standard applications\nWork on S/4HANA development using RAP, OData, CDS Views, and SAP Fiori\nParticipate in production support and rotational on-call coverage",
    "basic_qualifications": "2+ years of SAP application development and support experience\n2+ years of ABAP development plus experience with IDOCs, BAPI, RFCs, and web services\n2+ years of S/4HANA programming experience including RAP, OData, CDS Views, and SAP Fiori\n2+ years of hands-on development experience in Eclipse toolsets\nBachelor's degree in Computer Science, Information Technology, related field, or equivalent experience",
    "preferred_qualifications": "Performance tuning experience for ABAP, CDS, and HANA applications\nExperience collaborating with functional consultants to resolve issues\nFlexibility for rotational on-call support and urgent production response\nKnowledge of SAPUI5, SAP BTP Services, SAP SqlScript, Postman, SOAP UI, and Chrome DevTools\nExperience in production support projects",
    "apply_url": "https://jobs.apple.com/en-us/details/200645208-0240/software-engineer-sap-development-support-is-t-enterprise-systems"
},
{
    "company": "Apple",
    "job_title": "Data Engineer, Operations Finance",
    "location": "Sunnyvale, California, United States",
    "job_type": "Full-time",
    "experience_level": "Senior",
    "salary": "$146,300 - $244,100",
    "description": "This Operations Finance Data Engineer role supports Apple's logistics costing and forecast processes by building scalable data models, analytics pipelines, dashboards, and GenAI-ready data foundations for finance and supply chain teams.",
    "key_responsibilities": "Understand and document logistics and supply chain finance processes\nIdentify automation and process reengineering opportunities\nBuild scalable data pipelines and analytics-ready data models\nImplement data governance, lineage, quality, and documentation best practices\nPartner with engineering teams on vector-ready data models and Agentic/GenAI foundations",
    "basic_qualifications": "5+ years of experience as a data engineer building end-to-end data pipelines\nBachelor's degree in Computer Science, Information Systems, or equivalent\nAdvanced SQL skills for transformations, optimization, and troubleshooting\nStrong Python proficiency for clean, maintainable data pipelines and automation",
    "preferred_qualifications": "Experience with Airflow, Jenkins, or similar scheduling and CI/CD tools\nHands-on experience with Snowflake, PostgreSQL, or similar cloud data warehouses\nSupply chain, logistics, finance, and accounting process knowledge\nStrong communication skills and ability to work independently",
    "apply_url": "https://jobs.apple.com/en-us/details/200657904-3956/data-engineer-operations-finance"
},
{
    "company": "Apple",
    "job_title": "Software Engineer, Hardware Engineering Operations",
    "location": "Austin, Texas, United States",
    "job_type": "Full-time",
    "experience_level": "Senior",
    "salary": "Competitive salary listed on Apple posting",
    "description": "Develop and support internal ECAD applications that help Apple hardware engineers design products. This full-stack role emphasizes scalable software, workflow automation, APIs, and data-driven tooling for engineering teams.",
    "key_responsibilities": "Design and maintain MCP services and APIs for AI-enabled applications and engineering tools\nBuild secure, scalable interfaces across data pipelines, simulation environments, and machine learning services\nCollaborate with hardware and software teams on proof-of-concepts and production systems\nLead design discussions and contribute across the full software lifecycle",
    "basic_qualifications": "Bachelor's degree in Computer Science\n5+ years of experience developing software applications, especially in JVM languages\n5+ years of experience defining requirements and delivering complex cross-functional software\nProficiency with Linux environments, JVM containers, and nginx\nHands-on experience solving complex engineering problems",
    "preferred_qualifications": "Experience with hardware or electrical engineering concepts\nExperience building APIs and microservices at scale\nFamiliarity with MCP architectures, AI/ML integrations, Java EE, RESTful services, React, Angular, Grails, or Spring\nStrong system design, database, integration, and technical leadership experience",
    "apply_url": "https://jobs.apple.com/en-us/details/200631955-0157/software-engineer-hardware-engineering-operations"
},
{
    "company": "IBM",
    "job_title": "Software Engineer",
    "location": "Location listed on official IBM posting",
    "job_type": "Full-time",
    "experience_level": "Mid",
    "salary": "See IBM posting",
    "description": "IBM's job page for this listing is currently JavaScript-protected. This seeded entry keeps the exact application URL and uses IBM's software engineering profile: building complex software systems, experimenting with open source and cloud technologies, and working on impactful engineering projects.",
    "key_responsibilities": "Create complex software systems\nCollaborate in agile teams on cloud and hybrid solutions\nContribute code, testing, and debugging across the software lifecycle\nSupport scalable enterprise technology projects",
    "basic_qualifications": "Professional software engineering experience\nStrong coding and problem-solving skills\nExperience with agile development and version control\nAbility to collaborate across engineering teams",
    "preferred_qualifications": "Cloud or hybrid cloud experience\nOpen-source contribution experience\nExperience with automation, DevOps, or AI-enabled tooling\nStrong written and verbal communication skills",
    "apply_url": "https://careers.ibm.com/en_US/careers/JobDetail?jobId=89835"
},
{
    "company": "IBM",
    "job_title": "Full Stack Developer",
    "location": "Location listed on official IBM posting",
    "job_type": "Full-time",
    "experience_level": "Mid",
    "salary": "See IBM posting",
    "description": "IBM's public job page for this role was blocked during extraction. This entry keeps the exact URL and uses IBM's full stack engineering profile centered on integrating multiple systems and delivering end-to-end applications in agile environments.",
    "key_responsibilities": "Build and integrate front-end and back-end systems\nWork across services, APIs, and data flows\nTest and debug features in agile delivery cycles\nPartner with stakeholders to deliver maintainable software",
    "basic_qualifications": "Experience with frontend and backend development\nUnderstanding of web application architecture and APIs\nStrong problem-solving and debugging skills\nAbility to work in agile teams",
    "preferred_qualifications": "Experience with cloud-native applications\nKnowledge of CI/CD and automation practices\nExperience with modern JavaScript frameworks and backend services\nStrong collaboration and communication skills",
    "apply_url": "https://careers.ibm.com/en_US/careers/JobDetail?jobId=99662"
},
{
    "company": "IBM",
    "job_title": "DevOps Engineer",
    "location": "Location listed on official IBM posting",
    "job_type": "Full-time",
    "experience_level": "Mid",
    "salary": "See IBM posting",
    "description": "IBM's direct role content was blocked by an anti-bot page. This normalized entry preserves the exact URL and uses IBM's DevOps engineering profile focused on automating, scaling, and deploying software infrastructure in agile teams.",
    "key_responsibilities": "Automate build, deployment, and release workflows\nMaintain scalable development and operations infrastructure\nImprove reliability, monitoring, and engineering velocity\nCollaborate with development and systems teams on cloud projects",
    "basic_qualifications": "Experience with Linux or cloud infrastructure\nKnowledge of CI/CD pipelines and automation\nScripting or infrastructure-as-code experience\nStrong troubleshooting skills",
    "preferred_qualifications": "Experience with container platforms and observability tools\nKnowledge of DevOps best practices at scale\nCloud platform certifications or equivalent experience\nAbility to improve team workflows through automation",
    "apply_url": "https://careers.ibm.com/en_US/careers/JobDetail?jobId=79649"
},
{
    "company": "Uber",
    "job_title": "Software Engineer I",
    "location": "San Francisco, California",
    "job_type": "Full-time",
    "experience_level": "Entry",
    "salary": "$161,637 - $193,964 per year",
    "description": "Design, develop, and test software applications using Uber's technology stack. The role focuses on scalable systems, business operations support, and technical delivery across complex engineering environments.",
    "key_responsibilities": "Design, develop, and test software applications\nEvaluate complex technical issues and provide recommendations\nBuild software components for scalable systems\nCollaborate with cross-functional partners to deliver impactful solutions\nSolve production issues and improve engineering productivity",
    "basic_qualifications": "Master's degree in Computer Science, Engineering, Information Technology, Mathematics, Physics, or related field and 6 months of experience, or equivalent listed by Uber\nExperience with Java, Go, C++, or Python\nKnowledge of SQL or MySQL\nUnderstanding of data structures, algorithms, distributed systems, scalability, and software development lifecycle",
    "preferred_qualifications": "Experience designing technology stacks\nExperience with debugging and monitoring production services\nStrong collaboration with product, data science, and operations teams\nComfort working in large-scale systems",
    "apply_url": "https://www.uber.com/global/en/careers/list/157792/?uclick_id=dfd160d2-b82f-4abe-9aa6-f7caa29178ae"
},
{
    "company": "Uber",
    "job_title": "Software Engineer",
    "location": "Seattle, Washington",
    "job_type": "Full-time",
    "experience_level": "Mid",
    "salary": "$150,000 - $166,000 per year",
    "description": "Build scalable and resilient system solutions across Uber Infrastructure. This role includes application development, production support, monitoring, and collaboration with engineering partners on safe rollouts.",
    "key_responsibilities": "Design, develop, and test software applications\nWrite reliable, readable, efficient, and testable code\nMonitor production quality and resolve bugs and inefficiencies\nDesign and integrate scalable system solutions\nParticipate in on-call rotations and cross-functional rollout work",
    "basic_qualifications": "Bachelor's degree in Computer Science, Engineering, Information Technology, Mathematics, Physics, or related field\nExperience with C++, Python, Java, or Go\nKnowledge of SQL or MySQL\nUnderstanding of data structures, algorithms, technology stack design, and software development lifecycle",
    "preferred_qualifications": "Experience in infrastructure or resilient systems work\nExperience with code reviews and quality documentation\nComfort troubleshooting production incidents\nStrong cross-team communication skills",
    "apply_url": "https://www.uber.com/global/en/careers/list/157787/?uclick_id=dfd160d2-b82f-4abe-9aa6-f7caa29178ae"
},
{
    "company": "Uber",
    "job_title": "Software Engineer",
    "location": "Sunnyvale, California",
    "job_type": "Full-time",
    "experience_level": "Mid",
    "salary": "$150,000 - $166,000 per year",
    "description": "Develop and test software applications for Uber while supporting business operations and improving engineering productivity. This role emphasizes scalable systems, production reliability, and complex technical problem-solving.",
    "key_responsibilities": "Design, develop, and test software applications\nSupport business operations through scalable system development\nBuild reusable components integrated into production systems\nTroubleshoot technical issues and improve reliability",
    "basic_qualifications": "Professional software engineering experience\nStrong coding skills in one or more backend languages\nUnderstanding of scalable systems and distributed applications\nAbility to work across product and engineering teams",
    "preferred_qualifications": "Experience with production debugging and monitoring\nKnowledge of SQL and data-intensive systems\nStrong communication and execution in fast-paced environments\nExperience with reliability or performance improvements",
    "apply_url": "https://www.uber.com/global/en/careers/list/157820/?uclick_id=dfd160d2-b82f-4abe-9aa6-f7caa29178ae"
},
{
    "company": "Intel Corp",
    "job_title": "Software Product Manager",
    "location": "Santa Clara, California; Hillsboro, Oregon; Austin, Texas; Phoenix, Arizona",
    "job_type": "Full-time",
    "experience_level": "Senior",
    "salary": "$160,980 - $311,040 annually",
    "description": "Own the product strategy, roadmap, and execution for AI compute middleware that enables AI training and inference on accelerators and CPUs. The role bridges hardware capabilities, frameworks, and systems software to deliver scalable, high-performance compute infrastructure.",
    "key_responsibilities": "Define and own the product vision and roadmap for AI compute middleware\nTranslate hardware capabilities into middleware features\nDrive performance, scalability, and correctness for AI workloads\nPartner with framework PMs, driver, firmware, compiler, and kernel teams\nEnsure Day-0 enablement for new hardware, models, and software releases",
    "basic_qualifications": "Bachelor's degree with 6+ years of experience, or Master's degree in Computer Science, Software Engineering, MBA, or related field with 4+ years of experience\n6+ years of software product management experience and 2+ years in systems engineering or performance-critical software development\nExperience with AI training and inference workloads\nExperience with compute kernels, math libraries, runtime tuning, accelerators, and CPUs",
    "preferred_qualifications": "Hands-on experience with OneDNN, SYCL, Triton, CUDA-like, or kernel-level programming models\nExperience with AI frameworks or compiler stacks\nExperience with benchmarking, profiling, and performance analysis tools\nStrong technical communication and decision-making skills",
    "apply_url": "https://intel.wd1.myworkdayjobs.com/en-US/External/job/Software-Product-Manager_JR0282911?locations=1e4a4eb3adf1016541777876bf8111cf"
},
{
    "company": "Intel Corp",
    "job_title": "Infrastructure and DevOps Engineer",
    "location": "Hillsboro, Oregon; Folsom, California; Santa Clara, California; Phoenix, Arizona",
    "job_type": "Full-time",
    "experience_level": "Senior",
    "salary": "$137,610 - $265,870 annually",
    "description": "Design and operate infrastructure behind large-scale modeling, simulation, and data analysis workflows. This role supports Linux-based environments, CI/CD pipelines, automation, and scalable compute-intensive engineering systems.",
    "key_responsibilities": "Design, deploy, and maintain Linux-based infrastructure\nDesign and operate CI/CD pipelines for modeling frameworks and analysis tools\nAutomate build systems, toolchains, packaging, and dependency management\nSupport scalable compute-intensive workloads and improve observability\nWork cross-functionally to improve tooling quality and developer productivity",
    "basic_qualifications": "Bachelor's degree with 4+ years of experience, Master's degree with 3+ years, or PhD in Computer Science, Information Systems, Electrical Engineering, Mathematics, or related STEM field\n3+ years of infrastructure engineering, DevOps, software engineering, or build/release engineering\n3+ years working in Linux development environments\n2+ years with CI/CD systems and build systems such as Jenkins, GitHub Actions, GitLab CI, GNU Make, CMake, Bazel, or Ninja",
    "preferred_qualifications": "Experience writing automation in Python or Bash\nExperience with Docker or Kubernetes\nExperience supporting HPC, distributed workloads, Slurm, storage systems, or simulation workflows\nFamiliarity with performance tuning and semiconductor development workflows",
    "apply_url": "https://intel.wd1.myworkdayjobs.com/en-US/External/job/Infrastructure-and-DevOps-Engineer_JR0282936?locations=1e4a4eb3adf1016541777876bf8111cf"
},
{
    "company": "Intel Corp",
    "job_title": "Infrastructure and DevOps Engineer",
    "location": "Hillsboro, Oregon; Folsom, California; Santa Clara, California; Phoenix, Arizona",
    "job_type": "Full-time",
    "experience_level": "Senior",
    "salary": "$137,610 - $265,870 annually",
    "description": "A second copy of the same Intel Infrastructure and DevOps Engineer listing was supplied in the request. This seed entry preserves that duplicate application link so it appears as one of the requested 15 postings.",
    "key_responsibilities": "Design and maintain Linux infrastructure\nOperate CI/CD pipelines and automation workflows\nImprove reliability, observability, and scalability\nSupport compute-intensive engineering toolchains",
    "basic_qualifications": "Experience in infrastructure engineering or DevOps\nLinux development environment experience\nCI/CD and build system experience\nStrong cross-functional collaboration skills",
    "preferred_qualifications": "Python or Bash automation experience\nContainer or distributed systems experience\nHPC or simulation workflow support experience\nPerformance tuning and observability experience",
    "apply_url": "https://intel.wd1.myworkdayjobs.com/en-US/External/job/Infrastructure-and-DevOps-Engineer_JR0282936?locations=1e4a4eb3adf1016541777876bf8111cf"
},
{
    "company": "Salesforce",
    "job_title": "Staff Software Engineer, Android",
    "location": "California - San Francisco; Washington - Seattle; Georgia - Atlanta",
    "job_type": "Full-time",
    "experience_level": "Senior",
    "salary": "$197,300 - $313,700 annually",
    "description": "Join Slack's Mobile Guardrails team at Salesforce to improve the systems, delivery signals, architectural enforcement, and observability that help mobile apps ship safely and quickly. The role focuses on Android foundations, developer tooling, AI-assisted development, and mobile platform engineering at scale.",
    "key_responsibilities": "Improve build systems, test infrastructure, and architectural guardrails\nDefine quality at scale across Slack's mobile codebases\nUse observability and performance tooling to guide investment\nBuild and improve CI/CD, tooling, and mobile infrastructure systems\nInfluence and mentor engineers through scalable technical leadership",
    "basic_qualifications": "7+ years of software engineering experience with strong Android foundations\nExperience with infrastructure, tooling, or platform work in large modular codebases\nHands-on experience with profiling, build analysis, metrics, and observability\nProficiency with Kotlin and the Android ecosystem\nExperience using AI-assisted development tools in engineering workflows\nRelated technical degree",
    "preferred_qualifications": "Experience with Gradle, Bazel, or large-scale build systems\nExperience with Honeycomb, Grafana, or similar observability tooling\nExperience with automated test strategies and stability management\nScripting experience in Python or Bash\nExperience contributing beyond Android into iOS, backend, or cross-platform tooling",
    "apply_url": "https://careers.salesforce.com/en/jobs/jr337555/staff-software-engineer-android/"
},
{
    "company": "Salesforce",
    "job_title": "Software Engineering Architect - Platform",
    "location": "California - San Francisco",
    "job_type": "Full-time",
    "experience_level": "Senior",
    "salary": "$218,400 - $365,200 annually",
    "description": "Lead the design and scaling of one of the world's largest Kubernetes deployments. This architect role focuses on a secure, reliable, large-scale container platform that powers thousands of microservices across diverse environments.",
    "key_responsibilities": "Lead architecture and evolution of the Kubernetes platform\nDefine tooling and APIs that optimize the software development lifecycle\nArchitect for scale, performance, reliability, and security\nGuide implementation teams as a subject matter expert\nDefine resilient microservice patterns and partner across infrastructure, security, and application teams",
    "basic_qualifications": "15+ years of progressive hands-on software or platform engineering experience\nExpert understanding of Kubernetes internals, networking, security, and extreme-scale operations\nDeep proficiency in Golang for infrastructure systems and platform tooling\nExtensive experience in infrastructure development, cloud, networking, storage, and infrastructure-as-code\nExpert knowledge of microservices, service mesh, API design, observability, and reliability",
    "preferred_qualifications": "Experience shaping platform strategy at very large scale\nStrong technical leadership across platform implementation teams\nExperience designing self-healing and low-complexity systems\nStrong cross-functional influence and communication skills",
    "apply_url": "https://careers.salesforce.com/en/jobs/jr315655/software-engineering-architect-platform/"
},
{
    "company": "Salesforce",
    "job_title": "Staff Full Stack Engineer, Platform DevXP",
    "location": "California - San Francisco; Washington - Seattle",
    "job_type": "Full-time",
    "experience_level": "Senior",
    "salary": "$197,300 - $313,700 annually",
    "description": "Slack's Platform Developer Experience team is seeking a Staff Full-Stack Engineer to design and deliver end-to-end features for developer tooling, Slack-built apps, and the broader developer ecosystem. The role blends product collaboration, full-stack engineering, AI-assisted development, and platform thinking.",
    "key_responsibilities": "Partner with product managers and designers to build developer ecosystem features\nWork on Slack Apps and improve app directory capabilities\nCreate automated testing processes and reusable architectural patterns\nBuild production-grade software using modern engineering practices and AI tooling\nMentor engineers and support production excellence through issue triage and resolution",
    "basic_qualifications": "7+ years of professional experience building and shipping web applications and developer tooling\nProficiency in JavaScript, TypeScript, and Python\nExperience with API design and development\nExperience building and debugging complex systems in team environments\nStrong UX and design sensibilities\nExperience using AI development tools and advanced prompting techniques\nRelated technical degree",
    "preferred_qualifications": "Experience with Hack, XHP, Java, or Go\nExperience with web analytics, SEO, and data-driven optimization\nExperience building Slack Apps\nStrong empathy for third-party developers and developer experience work",
    "apply_url": "https://careers.salesforce.com/en/jobs/jr332802/staff-full-stack-engineer-platform-devxp/"
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
            show_in_discover=True,
            source_job=None,
            status="new"
        )

    print("All jobs seeded successfully!")
