from django.core.management.base import BaseCommand
from api.models import Sweet

class Command(BaseCommand):
    help = 'Create sample sweets data'

    def handle(self, *args, **options):
        # Clear existing sweets
        Sweet.objects.all().delete()
        
        # Create sample sweets
        sweets_data = [
            {
                'name': 'Gulab Jamun',
                'description': 'Soft, spongy milk-solid balls soaked in rose-flavored sugar syrup. A classic Indian dessert loved by all.',
                'category': 'traditional',
                'price': 150.00,
                'quantity': 50
            },
            {
                'name': 'Rasgulla',
                'description': 'Spongy cottage cheese balls soaked in light sugar syrup. A popular Bengali sweet.',
                'category': 'traditional',
                'price': 120.00,
                'quantity': 40
            },
            {
                'name': 'Jalebi',
                'description': 'Crispy, spiral-shaped sweet made from refined flour and soaked in sugar syrup.',
                'category': 'traditional',
                'price': 80.00,
                'quantity': 30
            },
            {
                'name': 'Chocolate Truffle',
                'description': 'Rich chocolate ganache coated with cocoa powder. A modern twist to traditional sweets.',
                'category': 'chocolate',
                'price': 200.00,
                'quantity': 25
            },
            {
                'name': 'Mango Barfi',
                'description': 'Sweet made from mango pulp and condensed milk. Perfect for summer.',
                'category': 'fruit',
                'price': 180.00,
                'quantity': 35
            },
            {
                'name': 'Pista Burfi',
                'description': 'Traditional sweet made with pistachios and condensed milk. Rich and nutty flavor.',
                'category': 'nut',
                'price': 250.00,
                'quantity': 20
            }
        ]
        
        for sweet_data in sweets_data:
            Sweet.objects.create(**sweet_data)
        
        self.stdout.write(
            self.style.SUCCESS(f'Successfully created {len(sweets_data)} sample sweets')
        ) 