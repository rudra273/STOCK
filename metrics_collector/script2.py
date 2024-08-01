import time
from prometheus_client import start_http_server, Gauge
import psycopg2
from psycopg2 import sql

# Database connection parameters
DB_NAME = "mydb"
DB_USER = "rudra"
DB_PASSWORD = "1234"
DB_HOST = "db"
DB_PORT = "5432"

# Create a gauge to track stock percentage change
stock_percentage_change = Gauge('stock_percentage_change', 
                                'Stock percentage change', 
                                ['symbol'])


def get_stock_data():
    conn = psycopg2.connect(
        dbname=DB_NAME,
        user=DB_USER,
        password=DB_PASSWORD,
        host=DB_HOST,
        port=DB_PORT
    )
    cur = conn.cursor()
    
    cur.execute(sql.SQL("""
        SELECT "Symbol", "PercentageChange"
        FROM stock_data
    """))
    
    results = cur.fetchall()
    
    cur.close()
    conn.close()
    
    return results

def update_metrics():
    for symbol, percentage_change in get_stock_data():
        stock_percentage_change.labels(symbol=symbol).set(percentage_change)

if __name__ == '__main__':
    # Start up the server to expose the metrics.
    start_http_server(7878)
    
    # Main loop
    while True:
        update_metrics()
        print('working')
        time.sleep(60) 