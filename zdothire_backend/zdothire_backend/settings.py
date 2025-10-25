"""
Django settings for zdothire_backend project.
"""

import os
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent.parent

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = 'django-insecure-c-h3%=$n9=5j7x05ejp7o(mhazv=67cf5zs8g$m8s8x3q8da42'

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

ALLOWED_HOSTS = ['*']


# -------------------- APPLICATIONS --------------------
INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',

    # Third-party
    'rest_framework',
    'corsheaders',

    # Local app
    'zdothire',
]
CORS_ALLOWED_ORIGINS = [
    "http://127.0.0.1:8000",   # Local frontend
    "http://localhost:8000",   # Optional local dev alias
    "http://65.0.12.220",      # Your EC2 public IP
]
# -------------------- MIDDLEWARE --------------------
MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'zdothire_backend.urls'


# -------------------- TEMPLATES --------------------
# Since your `index.html` is directly under `zdothire/templates/`,
# Django will automatically find it because APP_DIRS=True.
TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],  # no need for global template folder
        'APP_DIRS': True,  # enables searching inside each app's /templates/
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]


WSGI_APPLICATION = 'zdothire_backend.wsgi.application'


# -------------------- DATABASE --------------------
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql',
        'NAME': 'FactGpt',
        'USER': 'deversion',
        'PASSWORD': 'IcWatG6Si5G6JRQqM8NP',
        'HOST': 'deversion.cc9ktjlphgjr.ap-south-1.rds.amazonaws.com',
        'PORT': '3306',
    }
}


# -------------------- PASSWORD VALIDATORS --------------------
AUTH_PASSWORD_VALIDATORS = [
    {'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator'},
    {'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator'},
    {'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator'},
    {'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator'},
]


# -------------------- INTERNATIONALIZATION --------------------
LANGUAGE_CODE = 'en-us'
TIME_ZONE = 'UTC'
USE_I18N = True
USE_TZ = True


# -------------------- STATIC FILES --------------------
STATIC_URL = '/static/'
STATICFILES_DIRS = [
    BASE_DIR / 'zdothire' / 'static',  # points to zdothire/static/
]
STATIC_ROOT = BASE_DIR / 'staticfiles'  # for collectstatic in production


# -------------------- DEFAULT AUTO FIELD --------------------
DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'
CORS_ALLOW_HEADERS = [
    'accept',
    'accept-encoding',
    'authorization',
    'content-type',
    'dnt',
    'origin',
    'user-agent',
    'x-csrftoken',
    'x-requested-with',
]

CORS_ALLOW_METHODS = [
    'DELETE',
    'GET',
    'OPTIONS',
    'PATCH',
    'POST',
    'PUT',
]