import threading
import time
import subprocess
import os
from .models import StockData
import pytz
import yfinance as yf
from datetime import datetime, timedelta


COUNTRY_MARKET_HOURS = {
    'USA': {
        'timezone': 'US/Eastern',
        'market_open': '09:30:00',
        'market_close': '16:00:00'
    },
    'India': {
        'timezone': 'Asia/Kolkata',
        'market_open': '09:15:00',
        'market_close': '15:30:00'
    }
}

def get_stock_data(symbols, country):
    data = []
    market_hours = COUNTRY_MARKET_HOURS.get(country)
    if not market_hours:
        raise ValueError(f"Market hours for country '{country}' not found")

    tz = pytz.timezone(market_hours['timezone'])
    now = datetime.now(tz)
    today = now.date()
    current_time = now.time()
    
    market_open = datetime.strptime(market_hours['market_open'], '%H:%M:%S').time()
    market_close = datetime.strptime(market_hours['market_close'], '%H:%M:%S').time()

    market_state = 'closed'
    if today.weekday() < 5:  # Weekdays only
        if market_open <= current_time <= market_close:
            market_state = 'open'

    for symbol in symbols:
        try:
            stock = yf.Ticker(symbol)
            hist = stock.history(period='1d')

            if hist.empty:
                continue
            
            open_price = round(float(hist['Open'].iloc[0]), 4)
            close_price = round(float(hist['Close'].iloc[0]), 4)
            high_price = round(float(hist['High'].iloc[0]), 4)
            low_price = round(float(hist['Low'].iloc[0]), 4)
            previous_close = round(float(hist['Close'].iloc[0]), 4)  # No previous close for a single day; use current close

            fifty_two_week_low = round(float(stock.info.get('fiftyTwoWeekLow', 0)), 4)
            fifty_two_week_high = round(float(stock.info.get('fiftyTwoWeekHigh', 0)), 4)

            weekly_hist = stock.history(period='5d')
            weekly_low = round(float(weekly_hist['Low'].min()), 4) if not weekly_hist.empty else float('nan')
            weekly_high = round(float(weekly_hist['High'].max()), 4) if not weekly_hist.empty else float('nan')

            monthly_hist = stock.history(period='1mo')
            monthly_low = round(float(monthly_hist['Low'].min()), 4) if not monthly_hist.empty else float('nan')
            monthly_high = round(float(monthly_hist['High'].max()), 4) if not monthly_hist.empty else float('nan')

            market_cap = int(stock.info.get('marketCap', 0)) if stock.info.get('marketCap') else None
            company_name = stock.info.get('longName', 'N/A')
            currency = stock.info.get('currency', 'N/A')

            percentage_change = round(float(((close_price - open_price) / open_price) * 100), 4) if open_price else float('nan')
            price_change = 'up' if close_price > open_price else 'down'

            data.append({
                'Symbol': symbol,
                'Open': open_price,
                'High': high_price,
                'Low': low_price,
                'Close': close_price,
                'CurrentPrice': close_price,
                'PreviousClose': previous_close,
                'FiftyTwoWeekLow': fifty_two_week_low,
                'FiftyTwoWeekHigh': fifty_two_week_high,
                'WeeklyLow': weekly_low,
                'WeeklyHigh': weekly_high,
                'MonthlyLow': monthly_low,
                'MonthlyHigh': monthly_high,
                'MarketCap': market_cap,
                'CompanyName': company_name,
                'Currency': currency,
                'PercentageChange': percentage_change,
                'PriceChange': price_change,
                'MarketState': market_state
            })

        except (ValueError, TypeError, KeyError, AttributeError) as e:
            print(f"Error processing symbol {symbol}: {e}")
            # Optionally, you can log the error or handle it in other ways

    return data



def update_stock_data(stock_data):
    for data in stock_data:
        symbol = data.get('Symbol')
        try:
            # Update or create a new record based on the symbol
            obj, created = StockData.objects.update_or_create(
                Symbol=symbol,
                defaults={
                    'Open': data.get('Open'),
                    'High': data.get('High'),
                    'Low': data.get('Low'),
                    'Close': data.get('Close'),
                    'CurrentPrice': data.get('CurrentPrice'),
                    'PreviousClose': data.get('PreviousClose'),
                    'FiftyTwoWeekLow': data.get('FiftyTwoWeekLow'),
                    'FiftyTwoWeekHigh': data.get('FiftyTwoWeekHigh'),
                    'WeeklyLow': data.get('WeeklyLow'),
                    'WeeklyHigh': data.get('WeeklyHigh'),
                    'MonthlyLow': data.get('MonthlyLow'),
                    'MonthlyHigh': data.get('MonthlyHigh'),
                    'MarketCap': data.get('MarketCap'),
                    'CompanyName': data.get('CompanyName'),
                    'Currency': data.get('Currency'),
                    'PercentageChange': data.get('PercentageChange'),
                    'PriceChange': data.get('PriceChange'),
                    'MarketState': data.get('MarketState'),
                }
            )
        except Exception as e:
            print(f"Error updating stock data for {symbol}, {e}")
            # Optionally, you can log the error or handle it in other ways


def main():
    symbols = [
    "MSFT", "AAPL", "GOOGL", "AMZN", "TSLA", "META", "NVDA", "ADBE", "INTC", "NFLX",
    "CSCO", "AMD", "BA", "IBM", "DIS", "PYPL", "MA", "V", "WMT", "KO"
        ]   

    symbols_env = os.getenv('STOCK_SYMBOLS', '').split(',')

    if symbols_env:
        symbols = symbols + symbols_env

    country = "USA"

    stock_data = get_stock_data(symbols, country)
    update_stock_data(stock_data)
    print('updated')



# Define the function that runs the script
def run_ingest():
    while True:
        try:
            main()
            # Run the ingest.py script
            subprocess.run(['python', 'services/ingest.py'], check=True) 
            print('current data updated.')
        except subprocess.CalledProcessError as e:
            # Handle errors in script execution
            print(f"Error running ingest.py: {e}")
        time.sleep(60)  # Wait for 60 seconds before running again


def run_daily_task():
    while True:
        try:
            # Run the daily_task.py script
            subprocess.run(['python', 'services/historical_ingestion.py'], check=True)
            print('historical data updated')
        except subprocess.CalledProcessError as e:
            # Handle errors in script execution
            print(f"Error running daily_task.py: {e}")
        time.sleep(900)  # Wait for 1 day (24 hours) befor


# Define the function to start the background task
# def start_background_task():
#     # Create and start a daemon thread for the background task
#     thread = threading.Thread(target=run_ingest)
#     thread.daemon = True  # Ensure the thread exits when the main program exits
#     thread.start()

def start_background_task():
    # Create and start a daemon thread for the 60-second task
    ingest_thread = threading.Thread(target=run_ingest)
    ingest_thread.daemon = True  # Ensure the thread exits when the main program exits
    ingest_thread.start()

    # Create and start a daemon thread for the daily task
    daily_task_thread = threading.Thread(target=run_daily_task)
    daily_task_thread.daemon = True  # Ensure the thread exits when the main program exits
    daily_task_thread.start()
