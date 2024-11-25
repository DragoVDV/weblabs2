from rest_framework import serializers
from ..models import House
from rest_framework import serializers
from ..models import House
from django.conf import settings

class HouseSerializer(serializers.ModelSerializer):
    image_url = serializers.SerializerMethodField()  # Define a custom field for the image URL

    class Meta:
        model = House
        fields = ['id', 'name', 'description', 'price', 'image', 'created', 'updated', 'image_url']  # Specify fields explicitly

    def get_image_url(self, obj):
        if obj.image:  # Check if the image exists
            return obj.image.url  # This returns the URL to the image file
        return None  # Return None if there is no image
    
    def validate_name(self, value):
        # Allow the existing name if updating the same house
        if self.instance and self.instance.name == value:
            return value  # If the name is the same as the current one, allow it

        # Check for duplicates among other houses
        if House.objects.filter(name=value).exists():
            raise serializers.ValidationError("A house with this name already exists.")
        return value