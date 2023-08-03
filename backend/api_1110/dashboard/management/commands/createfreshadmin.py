from django.core.management.base import BaseCommand
from django.contrib.auth.models import User
from django.utils.crypto import get_random_string
from decouple import config


class Command(BaseCommand):
    help = "Create a Django admin user with the provided credentials in .env"

    def handle(self, *args, **options):
        username = config("DJANGO_ADMIN_USERNAME")
        password = config("DJANGO_ADMIN_PASSWORD")
        email = config("DJANGO_ADMIN_EMAIL")

        if not User.objects.filter(username=username).exists():
            if not password:
                password = get_random_string(length=32)
            if not username:
                username = get_random_string(
                    length=5, allowed_chars="abcdefghijklmnopqrstuvwxyz"
                )

            User.objects.create_superuser(username, email, password)
            self.stdout.write(
                self.style.SUCCESS(
                    f"""################################################
                        # We have created an Admin for you. Please,
                        # save the password immediatly.
                        # 
                        # Username: {username}
                        # Password: {password}
                        # Email:    {email} 
                        #
                        #
                        ###############################################"""
                )
            )
        else:
            self.stdout.write(self.style.SUCCESS("Admin user already exists"))
