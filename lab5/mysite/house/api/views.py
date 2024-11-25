from django.http import JsonResponse
from django.shortcuts import render,redirect
from django.urls import reverse
from ..models import House
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .serializer import HouseSerializer
from rest_framework import generics, status
from django.views.generic import TemplateView
from django.contrib import messages
from django.template.loader import render_to_string
from django.urls import reverse
from django.db.models import Q



@api_view(['GET'])
def index(request):
    return render(request, "index.html")


from django.db.models import Sum
from rest_framework.decorators import api_view
from rest_framework.response import Response

from django.db.models import Sum
from rest_framework.decorators import api_view
from rest_framework.response import Response

@api_view(['GET'])
def view_page(request):
    sort_order = request.GET.get('sort', 'asc')
    search_query = request.GET.get('q', '').strip()
    items = House.objects.all()

    if search_query:
        items = items.filter(name__icontains=search_query)

    if sort_order == 'desc':
        items = items.order_by('-price')
    else:
        items = items.order_by('price')

    # Обчислення загальної ціни для видимих елементів
    total_price = items.aggregate(total=Sum('price'))['total'] or 0  # Використовуємо Sum для обчислення

    if request.headers.get('Accept') == 'application/json':
        serializer = HouseSerializer(items, many=True)
        return Response({
            'items': serializer.data,
            'total_price': total_price  # Повертаємо загальну ціну
        })

    context = {'houses': items, 'total_price': total_price}  # Додаємо загальну ціну до контексту
    return render(request, 'view_page.html', context)



@api_view(['DELETE'])
def delete_house(request, pk):
    try:
        house = House.objects.get(pk=pk)
        house.delete()
        print(f'House {pk} deleted successfully.')  # Debugging log
        return Response(status=status.HTTP_204_NO_CONTENT)
    except House.DoesNotExist:
        print(f'House {pk} does not exist.')  # Debugging log
        return Response(status=status.HTTP_404_NOT_FOUND)



from django.contrib import messages
from django.shortcuts import redirect
from django.urls import reverse
from rest_framework import generics


class HouseCreateView(generics.CreateAPIView):
    queryset = House.objects.all()
    serializer_class = HouseSerializer

    def get(self, request):
        return render(request, 'create.html')

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            self.perform_create(serializer)
            return Response({"success": True, "message": "House created successfully."}, status=201)

        errors = {}
        for field, field_errors in serializer.errors.items():
            errors[field] = field_errors
        
        return Response({"success": False, "errors": errors}, status=status.HTTP_400_BAD_REQUEST)

    

from django.contrib import messages

@api_view(['GET', 'PUT', 'POST'])
def item_edit(request, pk):
    try:
        house = House.objects.get(pk=pk)
    except House.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = HouseSerializer(house)
        context = {
            'house': serializer.data,
        }
        return render(request, 'item_edit.html', context)

    elif request.method == 'PUT' or request.method == 'POST':
        serializer = HouseSerializer(house, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({'success': True, 'data': serializer.data}, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)  # Ensure this line is present

    else:
        # Capture the validation error
        error_message = serializer.errors.get('name', ["An error occurred."])[0]
        messages.error(request, error_message[0])  # Use messages to send the error
        return render(request, 'item_edit.html', {
            'house': serializer.data,
        })
