from django.core.management.base import BaseCommand
from django.contrib.auth import get_user_model

User = get_user_model()

class Command(BaseCommand):
    help = 'Create a superuser with custom User model'

    def add_arguments(self, parser):
        parser.add_argument('--name', type=str, required=True, help='User name')
        parser.add_argument('--email', type=str, required=True, help='User email')
        parser.add_argument('--password', type=str, required=True, help='User password')

    def handle(self, *args, **options):
        name = options['name']
        email = options['email']
        password = options['password']

        if User.objects.filter(email=email).exists():
            self.stdout.write(self.style.WARNING(f'User with email {email} already exists'))
            return

        user = User.objects.create_superuser(
            email=email,
            name=name,
            password=password
        )

        self.stdout.write(
            self.style.SUCCESS(f'Successfully created superuser: {user.name} ({user.email})')
        ) 