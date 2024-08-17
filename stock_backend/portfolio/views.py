from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from .models import Portfolio
from api.models import StockData
from api.serializers import StockDataSerializer
from .serializers import PortfolioPerformanceSerializer
from datetime import datetime, timedelta, timezone
from rest_framework.views import APIView
from rest_framework import status
from rest_framework_simplejwt.authentication import JWTAuthentication
import pandas as pd
from services.postgres import fetch_data_from_pg


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def add_to_portfolio(request):
    stock_symbol = request.data.get('symbol')
    if not stock_symbol:
        return Response({"error": "Stock symbol is required"}, status=status.HTTP_400_BAD_REQUEST)
    
    portfolio, created = Portfolio.objects.get_or_create(user=request.user, stock_symbol=stock_symbol)
    if created:
        return Response({"message": "Stock added to portfolio"}, status=status.HTTP_201_CREATED)
    return Response({"message": "Stock already in portfolio"}, status=status.HTTP_200_OK)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def remove_from_portfolio(request):
    stock_symbol = request.data.get('symbol')
    if not stock_symbol:
        return Response({"error": "Stock symbol is required"}, status=status.HTTP_400_BAD_REQUEST)
    
    deleted_count, _ = Portfolio.objects.filter(user=request.user, stock_symbol=stock_symbol).delete()
    if deleted_count:
        return Response({"message": "Stock removed from portfolio"}, status=status.HTTP_200_OK)
    return Response({"message": "Stock not found in portfolio"}, status=status.HTTP_404_NOT_FOUND)



@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_portfolio(request):
    # Get the user's portfolio
    portfolio = Portfolio.objects.filter(user=request.user)
    portfolio_symbols = [p.stock_symbol for p in portfolio]
    
    # Fetch detailed stock data for these symbols
    stock_data = StockData.objects.filter(Symbol__in=portfolio_symbols)
    
    # Serialize the data
    serializer = StockDataSerializer(stock_data, many=True)
    
    # Return the serialized data
    return Response(serializer.data, status=status.HTTP_200_OK)





class PortfolioPerformanceAPIView(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
        user = request.user
        portfolio = Portfolio.objects.filter(user=user)
        symbols = [stock.stock_symbol for stock in portfolio]  # Use stock_symbol instead of symbol

        if not symbols:
            return Response({"error": "No stocks in the portfolio."}, status=status.HTTP_400_BAD_REQUEST)

        today = datetime.now().date()

        # Define the date ranges for calculations
        date_ranges = {
            'today': (today - timedelta(days=1), today),
            'weekly': (today - timedelta(weeks=1), today),
            'monthly': (today - timedelta(days=30), today),
            'yearly': (today - timedelta(days=365), today)
        }

        # Convert date ranges to datetime for comparison
        date_ranges = {
            period: (datetime.combine(start, datetime.min.time()), datetime.combine(end, datetime.max.time()))
            for period, (start, end) in date_ranges.items()
        }

        # Query to get all relevant historical data for the portfolio symbols
        query = """
        SELECT "symbol", "company_name", "Date", "Close"
        FROM public.historical_data
        WHERE "symbol" IN %s AND "Date" BETWEEN %s AND %s
        ORDER BY "Date";
        """
        
        end_date = today
        start_date = today - timedelta(days=365)  # Get data for the past year

        df = fetch_data_from_pg(
            schema_name='public',
            table_or_view_name='historical_data',
            query=query,
            params=(tuple(symbols), start_date, end_date)
        )

        if df is None or df.empty:
            return Response({"error": "No historical data found."}, status=status.HTTP_404_NOT_FOUND)

        # Ensure the 'Date' column is of type datetime
        df['Date'] = pd.to_datetime(df['Date'])

        results = []

        for symbol in symbols:
            stock_df = df[df['symbol'] == symbol]
            if stock_df.empty:
                continue

            # Extract the company name from the DataFrame
            company_name = stock_df['company_name'].iloc[0]

            stock_results = {'symbol': symbol, 'company_name': company_name}

            for period, (start, end) in date_ranges.items():
                period_df = stock_df[(stock_df['Date'] >= start) & (stock_df['Date'] <= end)]
                
                if period_df.empty:
                    stock_results[f'{period}_percent_change'] = None
                    continue
                
                latest_close = period_df['Close'].iloc[-1]
                earliest_close = period_df['Close'].iloc[0]
                percent_change = ((latest_close - earliest_close) / earliest_close) * 100
                stock_results[f'{period}_percent_change'] = round(percent_change, 2)

            results.append(stock_results)

        serializer = PortfolioPerformanceSerializer(results, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
