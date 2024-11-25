from django.db import models
from django import forms

class House(models.Model):
    name = models.CharField(max_length=50,)
    description = models.CharField(max_length=300)
    price = models.PositiveIntegerField()
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)
    image = models.ImageField(default='fallbakc.png', blank=True)
    def __str__(self):
        return self.name
     