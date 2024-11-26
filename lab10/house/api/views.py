from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import CartItem, House, Cart
from .serializers import HouseSerializer
from rest_framework import status
from django.db.models import Q
from django.views.decorators.csrf import csrf_exempt
from rest_framework import status
from rest_framework.permissions import AllowAny
from django.shortcuts import get_object_or_404
from rest_framework.parsers import MultiPartParser, FormParser

class HousesView(APIView):
    def get(self, request, *args, **kwargs):
        ordering = request.query_params.get('ordering')
        house_type = request.query_params.get('type')
        search_query = request.query_params.get('search', '').strip()
        show_more = request.query_params.get('showMore', 'true') == 'false'

        # Базовий queryset для всіх об'єктів House
        queryset = House.objects.all()
        
        # Фільтрація по типу будинку
        if house_type:
            queryset = queryset.filter(type=house_type)
        
        if search_query:
            queryset = queryset.filter(Q(title__icontains=search_query))

        if ordering in ['title', '-title', 'price', '-price']:
            queryset = queryset.order_by(ordering)

       
        if  show_more:
            queryset = queryset[:3]
        
        serializer = HouseSerializer(queryset, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class CreateItemAPIView(APIView):
    permission_classes = [AllowAny]

    @csrf_exempt  
    def post(self, request):
        serializer = HouseSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

class UpdateItemAPIView(APIView):
    permission_classes = [AllowAny]
    parser_classes = (MultiPartParser, FormParser)  

    def put(self, request, id):
        item = get_object_or_404(House, id=id)
        serializer = HouseSerializer(item, data=request.data, partial=True)  

       
        if request.FILES.get('image'):
            item.image = request.FILES['image']

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

class RetrieveItemAPIView(APIView):
    permission_classes = [AllowAny]

    def get(self, request, id):
        item = get_object_or_404(House, id=id)
        serializer = HouseSerializer(item)
        return Response(serializer.data, status=status.HTTP_200_OK)
    

class DeleteItemAPIView(APIView):
    permission_classes = [AllowAny]

    def delete(self, request, id):
        item = get_object_or_404(House, id=id)
        item.delete()
        return Response({"message": "Item deleted successfully"}, status=status.HTTP_204_NO_CONTENT)
    
class AddToCartAPIView(APIView):
    def post(self, request, id):
        try:
            rental_days = request.data.get('rental_days', 1)  # Отримуємо кількість днів оренди
            rental_days = max(1, int(rental_days))  # Мінімум 1 день

            # Отримуємо або створюємо кошик
            cart, created = Cart.objects.get_or_create(id=1)  # Логіка для конкретного користувача

            # Отримуємо будинок за його ID
            house = get_object_or_404(House, id=id)

            # Перевіряємо, чи будинок вже є в кошику
            cart_item, created = CartItem.objects.get_or_create(cart=cart, house=house)

            if not created:
                return Response(
                    {"message": f"House is already in the cart."},
                    status=status.HTTP_400_BAD_REQUEST
                )

            # Зберігаємо кількість днів оренди
            cart_item.rental_days = rental_days
            cart_item.save()

            return Response({"message": f"House added to cart for {rental_days} days."}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class GetCartItemsAPIView(APIView):
    def get(self, request):
        try:
           
            cart = Cart.objects.first()  
            if not cart:
                return Response({"message": "Cart is empty"}, status=status.HTTP_200_OK)

           
            cart_items = CartItem.objects.filter(cart=cart).select_related('house')

            total_price = 0
            data = []
            for cart_item in cart_items:
                house_data = HouseSerializer(cart_item.house).data
                rental_days = cart_item.rental_days
                total_price += cart_item.house.price * rental_days
                data.append({
                    "house": house_data,
                    "rental_days": rental_days,
                })

            return Response({"items": data, "total_price": total_price}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class UpdateRentalDaysAPIView(APIView):
    def put(self, request, id):
        rental_days = request.data.get('rentalDays')
        if not rental_days:
            return Response({"error": "Rental days not provided"}, status=status.HTTP_400_BAD_REQUEST)

        cart = Cart.objects.first()
        if not cart:
            return Response({"error": "Cart not found"}, status=status.HTTP_404_NOT_FOUND)

        cart_item = get_object_or_404(CartItem, cart=cart, house__id=id)
        cart_item.rental_days = rental_days
        cart_item.save()

        
       

        return Response({
            "message": f"Rental days updated to {rental_days}",
            
        }, status=status.HTTP_200_OK)


class RemoveFromCartAPIView(APIView):
    def delete(self, request, id):
        try:
            cart = Cart.objects.first()
            if not cart:
                return Response({"message": "Cart is empty"}, status=status.HTTP_404_NOT_FOUND)

            cart_item = get_object_or_404(CartItem, cart=cart, house__id=id)
            cart_item.delete()

           
          

            return Response({
                "message": f"House removed from cart.",
                
            }, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
def calculate_total_price(cart):
    """
    Обчислює загальну ціну для кошика.
    """
    return sum(
        item.house.price * item.rental_days
        for item in CartItem.objects.filter(cart=cart)
    )

class GetCartTotalPriceAPIView(APIView):
    def get(self, request):
        cart = Cart.objects.first()  # Логіка для конкретного користувача
        if not cart:
            return Response({"total_price": 0}, status=status.HTTP_200_OK)

        total_price = calculate_total_price(cart)
        return Response({"total_price": total_price}, status=status.HTTP_200_OK)