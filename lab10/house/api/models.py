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

class Cart(models.Model):
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"Cart #{self.id} - {self.created_at}"

class CartItem(models.Model):
    cart = models.ForeignKey(Cart, on_delete=models.CASCADE, related_name="items")
    house = models.ForeignKey(House, on_delete=models.CASCADE, related_name="cart_items")
    rental_days = models.PositiveIntegerField(default=1)  # Індивідуальна кількість днів

    class Meta:
        unique_together = ('cart', 'house')  # Забезпечення унікальності пари cart-house

    def __str__(self):
        return f"{self.house.title} in Cart #{self.cart.id} for {self.rental_days} days"
