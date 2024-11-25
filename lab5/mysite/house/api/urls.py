from . import views
from django.urls import path,include
from django.conf import settings
from django.conf.urls.static import static
from .views import HouseCreateView
urlpatterns = [
    path("", views.index, name="index"),
    path("modellen", views.view_page, name="modellen"),
    path('create/', HouseCreateView.as_view(), name='create'),
    path('item_edit/<int:pk>/', views.item_edit, name="item_edit"),
    path('delete/<int:pk>/', views.delete_house, name='delete_house'),

] 

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
    