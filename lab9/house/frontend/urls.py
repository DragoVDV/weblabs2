from django.urls import path
from .views import index
from django.conf import settings
from django.conf.urls.static import static
urlpatterns = [
    path('', index, name='index'),  
    path('catalog', index, name='catalog'),
    path('create', index, name='create'),
    path('edit/<int:id>', index, name='edit'),
    path('view/<int:id>', index, name='view'),
]
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

