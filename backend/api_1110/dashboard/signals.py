from django.db.models.signals import post_save
from django.dispatch import receiver
from django.contrib.auth.models import User
from .models import UserProfile, ApiUsage
import uuid


@receiver(post_save, sender=User)
def create_user_profile(sender, instance, created, **kwargs):
    if created:
        while True:
            api_key = str(uuid.uuid4())
            try:
                ApiUsage.objects.create(api_key=api_key)
                UserProfile.objects.create(
                    user=instance, profile_picture="profile_pics/default.jpg"
                )
                break
            except IntegrityError:
                # uuid collission
                pass


@receiver(post_save, sender=User)
def save_user_profile(sender, instance, **kwargs):
    instance.userprofile.save()
