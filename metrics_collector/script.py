from prometheus_client import start_http_server, Gauge
import psycopg2
import time

# Define the metrics
open_gauge = Gauge('stock_open', 'The opening price of the stock', ['symbol'])
high_gauge = Gauge('stock_high', 'The highest price of the stock', ['symbol'])
low_gauge = Gauge('stock_low', 'The lowest price of the stock', ['symbol'])
close_gauge = Gauge('stock_close', 'The closing price of the stock', ['symbol'])
week_high_gauge = Gauge('stock_week_high', 'The weekly high price of the stock', ['symbol'])
week_low_gauge = Gauge('stock_week_low', 'The weekly low price of the stock', ['symbol'])
month_high_gauge = Gauge('stock_month_high', 'The monthly high price of the stock', ['symbol'])
month_low_gauge = Gauge('stock_month_low', 'The monthly low price of the stock', ['symbol'])
market_cap_gauge = Gauge('stock_market_cap', 'The market capitalization of the stock', ['symbol'])
percentage_change_gauge = Gauge('percentage_change', 'The percentage change value', ['symbol'])

def collect_metrics():
    # Connect to PostgreSQL
    conn = psycopg2.connect("dbname=mydb user=rudra password=1234 host=db port=5432")
    cur = conn.cursor()
    # Query to get the stock data
    cur.execute('''
        SELECT "Symbol", "Open", "High", "Low", "Close", "WeeklyHigh", "WeeklyLow", "MonthlyHigh", "MonthlyLow", "MarketCap", "PercentageChange"
        FROM stock_data
    ''')
    for row in cur.fetchall():
        symbol = row[0]
        open_price = row[1]
        high_price = row[2]
        low_price = row[3]
        close_price = row[4]
        week_high = row[5]
        week_low = row[6]
        month_high = row[7]
        month_low = row[8]
        market_cap = row[9]
        percentage_change = row[10]

        # Set the metrics with the column data
        open_gauge.labels(symbol=symbol).set(open_price)
        high_gauge.labels(symbol=symbol).set(high_price)
        low_gauge.labels(symbol=symbol).set(low_price)
        close_gauge.labels(symbol=symbol).set(close_price)
        week_high_gauge.labels(symbol=symbol).set(week_high)
        week_low_gauge.labels(symbol=symbol).set(week_low)
        month_high_gauge.labels(symbol=symbol).set(month_high)
        month_low_gauge.labels(symbol=symbol).set(month_low)
        market_cap_gauge.labels(symbol=symbol).set(market_cap)
        percentage_change_gauge.labels(symbol=symbol).set(percentage_change)

    cur.close()
    conn.close()

if __name__ == '__main__':
    start_http_server(7878)
    while True:
        collect_metrics()
        time.sleep(60)  # Update metrics every 60 seconds