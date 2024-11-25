
from django.contrib import admin
from .models import House
from .models import Cart 

class CartAdmin(admin.ModelAdmin):
    list_display = ('id', 'display_houses', 'created_at', 'updated_at')

    def display_houses(self, obj):
        return ", ".join([house.title for house in obj.houses.all()])
    display_houses.short_description = "Houses"

admin.site.register(Cart, CartAdmin)
admin.site.register(House)
