from django.urls import path
from django.conf import settings
from django.conf.urls.static import static
from .views import HousesView, CreateItemAPIView, UpdateItemAPIView, RetrieveItemAPIView, DeleteItemAPIView

urlpatterns = [
    path('', HousesView.as_view(), name='index'),
    path('create/', CreateItemAPIView.as_view(), name='create'),
    path('<int:id>/update/', UpdateItemAPIView.as_view(), name='update'),
    path('<int:id>/', RetrieveItemAPIView.as_view(), name='get_item'),
    path('<int:id>/delete/', DeleteItemAPIView.as_view(), name='delete'),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
