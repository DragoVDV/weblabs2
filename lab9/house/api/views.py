from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import House
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