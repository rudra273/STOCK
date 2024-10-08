from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('api.urls')),
    path('users/', include('users.urls')),
    path('api/portfolio/', include('portfolio.urls')),
]
