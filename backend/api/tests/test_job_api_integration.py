"""Integration-style API tests for discover jobs (/api/companies/) and tracker (/api/tracker/)."""

from unittest.mock import patch

import pytest
from django.contrib.auth import get_user_model
from rest_framework import status
from rest_framework.test import APIClient

from api.models import JobListing

User = get_user_model()


@pytest.fixture
def api_client():
    return APIClient()


@pytest.fixture
def discover_job_payload():
    return {
        "job_title": "Backend Engineer",
        "company": "Test Corp",
        "description": "Build APIs.",
        "key_responsibilities": "",
        "salary": "$100,000",
        "job_type": "Full-time",
        "location": "Remote",
        "experience_level": "Mid",
        "apply_url": "https://example.com/apply",
    }


@pytest.fixture
def discover_job_instance(discover_job_payload):
    """Public discover listing owned by nobody (staff/admins seed these in production)."""
    return JobListing.objects.create(
        owner=None,
        source_job=None,
        show_in_discover=True,
        status="new",
        **discover_job_payload,
    )


@pytest.mark.django_db
def test_tracker_requires_authentication(api_client):
    response = api_client.get("/api/tracker/")
    assert response.status_code in (
        status.HTTP_401_UNAUTHORIZED,
        status.HTTP_403_FORBIDDEN,
    )


@pytest.mark.django_db
def test_health_check_returns_200(api_client):
    response = api_client.get("/api/health/")
    assert response.status_code == status.HTTP_200_OK
    assert response.json()["status"] == "healthy"


@pytest.mark.django_db
def test_list_discover_jobs_includes_existing_listing(api_client, discover_job_instance):
    response = api_client.get("/api/companies/")
    assert response.status_code == status.HTTP_200_OK
    body = response.json()
    assert isinstance(body, list)
    assert any(j["job_title"] == "Backend Engineer" for j in body)


@pytest.mark.django_db
def test_staff_partial_update_discover_job(api_client, discover_job_instance):
    admin = User.objects.create_user(
        username="admin_tester",
        email="admin@example.com",
        password="secret123!",
        is_staff=True,
    )
    api_client.force_authenticate(user=admin)
    url = f"/api/companies/{discover_job_instance.id}/"
    response = api_client.patch(
        url, {"job_title": "Senior Backend Engineer"}, format="json"
    )
    assert response.status_code == status.HTTP_200_OK
    assert response.json()["job_title"] == "Senior Backend Engineer"
    discover_job_instance.refresh_from_db()
    assert discover_job_instance.job_title == "Senior Backend Engineer"


@pytest.mark.django_db
def test_non_staff_cannot_update_discover_job(api_client, discover_job_instance):
    user = User.objects.create_user(
        username="plain_user",
        email="plain@example.com",
        password="secret123!",
        is_staff=False,
    )
    api_client.force_authenticate(user=user)
    url = f"/api/companies/{discover_job_instance.id}/"
    response = api_client.patch(url, {"job_title": "Hacked Title"}, format="json")
    assert response.status_code == status.HTTP_403_FORBIDDEN


@pytest.mark.django_db
def test_tracker_crud_for_authenticated_owner(api_client, discover_job_payload):
    user = User.objects.create_user(
        username="tracker_user",
        email="tracker@example.com",
        password="secret123!",
    )
    api_client.force_authenticate(user=user)

    create_resp = api_client.post(
        "/api/tracker/",
        {**discover_job_payload, "job_title": "My Tracked Role"},
        format="json",
    )
    assert create_resp.status_code == status.HTTP_201_CREATED
    job_id = create_resp.json()["id"]

    update_resp = api_client.patch(
        f"/api/tracker/{job_id}/",
        {"job_title": "Renamed Tracked Role", "description": "Updated notes"},
        format="json",
    )
    assert update_resp.status_code == status.HTTP_200_OK
    assert update_resp.json()["job_title"] == "Renamed Tracked Role"

    delete_resp = api_client.delete(f"/api/tracker/{job_id}/")
    assert delete_resp.status_code == status.HTTP_204_NO_CONTENT
    assert not JobListing.objects.filter(pk=job_id).exists()


@pytest.mark.django_db
@patch("api.views.send_saved_job_reminder_email", return_value=False)
def test_save_from_discover_creates_linked_tracker_job(
    _mock_mail, api_client, discover_job_instance
):
    user = User.objects.create_user(
        username="saver",
        email="save@example.com",
        password="secret123!",
    )
    api_client.force_authenticate(user=user)
    resp = api_client.post(
        "/api/tracker/", {"source_job": discover_job_instance.id}, format="json"
    )
    assert resp.status_code in (
        status.HTTP_201_CREATED,
        status.HTTP_200_OK,
    )
    tracked = JobListing.objects.get(owner=user, source_job=discover_job_instance)
    assert tracked.job_title == discover_job_instance.job_title
