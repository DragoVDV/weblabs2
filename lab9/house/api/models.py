from django.db import models

TYPE_CHOICES = (
    ('Villa', 'Villa'),
    ('Cottage', 'Cottage'),
    ('Family House', 'Family House'),
)

class House(models.Model):
    title = models.CharField(max_length=50)
    description = models.TextField(max_length=300)
    price = models.IntegerField()
    type = models.CharField(max_length=12, choices=TYPE_CHOICES, default='Cottage')
    image = models.ImageField(upload_to='images')
    
    def __str__(self):
        return self.title
