from django.urls import path
from . import views

urlpatterns = [
    path('add/', views.add_to_portfolio, name='add_to_portfolio'),
    path('remove/', views.remove_from_portfolio, name='remove_from_portfolio'),
    path('get/', views.get_portfolio, name='get_portfolio'),
    path('performance/', views.PortfolioPerformanceAPIView.as_view(), name='portfolio_performance'),

]
