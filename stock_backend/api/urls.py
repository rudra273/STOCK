from django.urls import path 
from .views import ( StockDataAPIView, 
                    HistoricalStockDataAPIView, 
                    StockDataDBAPIView,
                    StockDataTAPIView )

urlpatterns = [
    path('stock-data/', StockDataAPIView.as_view(), name='stock-data'),

    path('historical-stock-data/', HistoricalStockDataAPIView.as_view(), name='historical-stock-data'),

    path('stock-data-db/', StockDataDBAPIView.as_view(), name='stock_data_db'),

    path('test/', StockDataTAPIView.as_view(), name='stock_data_test'),


]
