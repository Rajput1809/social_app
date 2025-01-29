from django.db import models
from django.contrib.auth.models import User
import uuid
import os

def complaint_image_path(instance, filename):
    """Generate unique path for each complaint image."""
    unique_id = uuid.uuid4().hex[:10]  # Unique 10-character ID
    ext = filename.split('.')[-1]  # Get file extension
    filename = f"{unique_id}.{ext}"  # Unique filename
    return os.path.join('complaints/', filename)  # Store in media/complaints/


class Complaint(models.Model):
    STATUS_CHOICES = [
        ('Pending', 'Pending'),
        ('In Progress', 'In Progress'),
        ('Completed', 'Completed'),
    ]

    complaint_id = models.UUIDField(default=uuid.uuid4, editable=False, unique=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    title = models.CharField(max_length=255)
    description = models.TextField()
    status = models.CharField(max_length=50, choices=STATUS_CHOICES, default='Pending')
    assigned_engineer = models.ForeignKey(
        User, on_delete=models.SET_NULL, null=True, blank=True, related_name="assigned_complaints"
    )
    created_at = models.DateTimeField(auto_now_add=True)
    image = models.ImageField(upload_to='complaint_images/', null=True, blank=True)
    suburb = models.CharField(max_length=255, null=True, blank=True)
    pincode = models.CharField(max_length=20, null=True, blank=True)
    state = models.CharField(max_length=255, null=True, blank=True)
    country = models.CharField(max_length=255, null=True, blank=True)
    location = models.CharField(max_length=255, null=True, blank=True)
    latitude = models.DecimalField(max_digits=9, decimal_places=6,blank=True, null=True)
    longitude = models.DecimalField(max_digits=9, decimal_places=6,blank=True, null=True)
    def __str__(self):
        return self.title
