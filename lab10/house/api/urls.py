from django.urls import path
from django.conf import settings
from django.conf.urls.static import static
from .views import HousesView, CreateItemAPIView, UpdateItemAPIView, RetrieveItemAPIView, DeleteItemAPIView,AddToCartAPIView,GetCartItemsAPIView,RemoveFromCartAPIView

urlpatterns = [
    path('', HousesView.as_view(), name='index'),
    path('create/', CreateItemAPIView.as_view(), name='create'),
    path('<int:id>/update/', UpdateItemAPIView.as_view(), name='update'),
    path('<int:id>/', RetrieveItemAPIView.as_view(), name='get_item'),
    path('<int:id>/delete/', DeleteItemAPIView.as_view(), name='delete'),
    path('cart/add/<int:id>/', AddToCartAPIView.as_view(), name='add_cart'),
    path('cart/items/', GetCartItemsAPIView.as_view(), name='get_cart_items'),
    path('cart/remove/<int:id>/', RemoveFromCartAPIView.as_view(), name='remove_from_cart'),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
