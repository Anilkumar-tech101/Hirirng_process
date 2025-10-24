# api/models.py

from django.db import models
from django.contrib.auth.hashers import make_password

class User(models.Model):
    full_name = models.CharField(max_length=100)
    company = models.CharField(max_length=100)
    phone_number = models.CharField(max_length=15, unique=True)
    email = models.EmailField(unique=True)
    password = models.CharField(max_length=255)

    class Meta:
        db_table = 'users' 

    def set_password(self, raw_password):
        self.password = make_password(raw_password)

    def __str__(self):
        return f"{self.full_name} ({self.email})"
