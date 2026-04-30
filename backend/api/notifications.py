import logging
import os

import boto3
from botocore.exceptions import BotoCoreError, ClientError


logger = logging.getLogger(__name__)


def send_saved_job_reminder_email(*, recipient_email: str, username: str, job_title: str, company: str) -> bool:
    sender_email = os.environ.get('AWS_SES_FROM_EMAIL', '').strip()
    region_name = os.environ.get('AWS_SES_REGION_NAME', os.environ.get('AWS_S3_REGION_NAME', 'us-east-1'))

    if not recipient_email or not sender_email:
        return False

    subject = f"Reminder: Apply for {job_title} at {company}"
    text_body = (
        f"Hi {username},\n\n"
        f"You saved {job_title} at {company} in InternPortal.\n"
        "This is your reminder to go back, review the posting, and submit your application when you're ready.\n\n"
        "Good luck with your job search!\n"
        "InternPortal"
    )
    html_body = (
        f"<html><body><p>Hi {username},</p>"
        f"<p>You saved <strong>{job_title}</strong> at <strong>{company}</strong> in InternPortal.</p>"
        "<p>This is your reminder to go back, review the posting, and submit your application when you're ready.</p>"
        "<p>Good luck with your job search!<br/>InternPortal</p>"
        "</body></html>"
    )

    try:
        client = boto3.client('ses', region_name=region_name)
        client.send_email(
            Source=sender_email,
            Destination={'ToAddresses': [recipient_email]},
            Message={
                'Subject': {'Data': subject},
                'Body': {
                    'Text': {'Data': text_body},
                    'Html': {'Data': html_body},
                },
            },
        )
        return True
    except (BotoCoreError, ClientError) as exc:
        logger.warning("SES reminder email failed: %s", exc)
        return False
