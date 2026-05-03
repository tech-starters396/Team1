"""
Test-specific Django settings — use with pytest (`DJANGO_SETTINGS_MODULE=config.settings_test`).

Uses in-memory SQLite so tests do not require PostgreSQL or AWS.
"""
from .settings import *  # noqa: F403, F401

DATABASES = {
    "default": {
        "ENGINE": "django.db.backends.sqlite3",
        "NAME": ":memory:",
    }
}

PASSWORD_HASHERS = [
    "django.contrib.auth.hashers.MD5PasswordHasher",
]

EMAIL_BACKEND = "django.core.mail.backends.locmem.EmailBackend"

# Ignore real S3 bucket for tests unless you explicitly toggle it in a test module.
USE_S3 = False
