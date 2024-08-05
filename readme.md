# Stock Dashboards

## Introduction
The 'Stock Dashboards' project provides a web-based interface to display stock market data. It integrates:
- Frontend: Next.js and Tailwind CSS
- Backend: Django
- Database: PostgreSQL
- Monitoring: Prometheus and Grafana

## Frontend Overview
The frontend is built with Next.js and Tailwind CSS. Key components:
- **Navigation Component**: Links to different pages, including a dashboard index.
- **Dashboard Component**: Displays market data and fetches historical stock data in a graph when a row is clicked.

## Backend Overview
The backend is developed using Django and includes APIs for user authentication and fetching stock data. It handles data ingestion and storage in PostgreSQL.

## APIs

### Realtime Stock Data API
- **Endpoint**: `GET /api/stock-data-db/`
- **Description**: Fetches real-time stock data.

### Historical Stock Data API
- **Endpoint**: `GET /api/historical-stock-data/`
- **Parameters**: 
  - `country` (required): The country for which the stock data is required (e.g., USA).
  - `period` (optional): The period for which the stock data is required (default is 1mo).
- **Example**: `http://localhost:8002/api/historical-stock-data/?country=USA&period=1mo`
- **Description**: Fetches historical stock data including Open, High, Low, Close, FiftyTwoWeekRange, Currency, PercentageChange, MarketState.

### User Management APIs
- **User Registration API**
  - **Endpoint**: `POST /api/register/`
  - **Request Body**: `username`, `password`, `email`
  - **Response**: Success message and user details.
- **User Login API**
  - **Endpoint**: `POST /api/login/`
  - **Request Body**: `username`, `password`
  - **Response**: JWT token.
- **User Details API**
  - **Endpoint**: `GET /api/user/`
  - **Headers**: `Authorization: Bearer <JWT token>`
  - **Response**: User details.

## JWT Authentication
- **User Login**: Provides username and password to receive a JWT token.
- **Token Storage**: Stored in local storage or cookies.
- **Authenticated Requests**: Include JWT token in the Authorization header.
- **Token Verification**: Backend verifies JWT token to process requests.

## Database
PostgreSQL is used to store:
- **Users**: Details such as username, password (hashed), and email.
- **Stock Data**: Prices and other relevant stock data.

## Metrics Collection and Monitoring

### Metrics-Collector Script
- Collects metrics from the database and exposes them on port 7878.
- Run the script to ensure metrics are available.

### Prometheus Setup
- **Configure Prometheus** to scrape metrics from `http://localhost:7878/metrics`.
- Start Prometheus to collect metrics.

### Grafana Setup
- **Set up Grafana** and configure data sources to use Prometheus.
- **Create dashboards and alerts** to visualize and monitor metrics.

## Kubernetes Setup
- **Deployment**: Defines desired state for pods.
- **Service**: Exposes the application and provides load balancing.
- **ConfigMap and Secret**: Stores configuration data and sensitive information.
- **Containerization**: Uses Docker; Kubernetes manages deployment, scaling, and operations.

## Project Flow
1. **User Registration and Login**: Users register and log in via the frontend.
2. **Data Fetching**: Frontend fetches and displays stock data from backend APIs.
3. **Metrics Collection**: Metrics-collector script runs and exposes metrics.
4. **Monitoring and Alerts**: Prometheus collects metrics, Grafana visualizes them, and alerts are configured.
5. **Deployment**: Application deployed on Kubernetes for scalability.

## Setup Instructions

### PostgreSQL Setup
```bash
# Ensure PostgreSQL is installed and running.
CREATE DATABASE stockdb;
CREATE USER stockuser WITH PASSWORD 'password';
GRANT ALL PRIVILEGES ON DATABASE stockdb TO stockuser;
```

### Backend Setup

#### Clone the Repository

```bash
git clone <repository-url>
cd <repository-directory>/backend

# Create a virtual environment and activate it
python -m venv venv
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Run migrations
python manage.py migrate

# Start the development server
python manage.py runserver
```


### Frontend Setup

```bash
# Navigate to the frontend directory
cd ../frontend

# Install dependencies
npm install

# Start the development server
npm run dev
```

### Metrics-Collector Script

#### Run the script to expose metrics

```sh
python script.py
```

### Prometheus Setup
- Configure Prometheus to scrape metrics from http://localhost:7878/metrics.
- Start Prometheus.
### Grafana Setup
- Set up Grafana and configure data sources to use Prometheus.
- Create dashboards and alerts.

# Conclusion
The 'Stock Dashboards' project integrates Next.js, Django, PostgreSQL, and comprehensive monitoring with Prometheus and Grafana. It is deployed on Kubernetes for scalability and reliability. Follow the setup instructions to run the project locally.

## ---







# ---

stock-frontend:0.3

docker build -t rudra273/stock-frontend:0.3 .

docker push rudra273/stock-frontend:0.3

## Build and Push Docker Images

```sh
cd metrics_collector
docker build -t rudra273/metrics-collector:latest .
docker push rudra273/metrics-collector:latest

cd ../stock_backend
docker build -t rudra273/stock-backend:latest .
docker push rudra273/stock-backend:latest

cd ../stock-dashboard
docker build -t rudra273/stock-frontend:latest .
docker push rudra273/stock-frontend:latest
```

## kubernets commands:

```sh

# Apply namespace
kubectl apply -f namespace.yml

# Apply Persistent Volume Claim
kubectl apply -f db-pvc.yml

# Apply ConfigMaps
kubectl apply -f prometheus-configmap.yml
kubectl apply -f grafana-configmap.yml

# Apply Deployments and Services
kubectl apply -f deployments/postgres.yml
kubectl apply -f deployments/backend.yml
kubectl apply -f deployments/frontend.yml
kubectl apply -f deployments/prometheus.yml
kubectl apply -f deployments/grafana.yml
kubectl apply -f deployments/metrics-collector.yml
```

# port forwardings

```sh
kubectl port-forward svc/backend -n stock-app 8002:8000 &
kubectl port-forward svc/frontend -n stock-app 3002:3000 &
kubectl port-forward svc/prometheus -n stock-app 9002:9090 &
kubectl port-forward svc/grafana -n stock-app 3005:3000 &
kubectl port-forward svc/postgres 5433:5432 -n stock-app 
```

# To see the pods

```sh
kubectl get pods -n stock-app
```

# kubernets Puuse / restart

```sh
minikube pause

minikube status

minikube unpause
```

# Accessing the dashboard
- Open a web browser and navigate to `http://localhost:3005` to access the Graf
- Open a web browser and navigate to `http://localhost:3002` to access the frontend
- Open a web browser and navigate to `http://localhost:9002` to access the Prometheus
- Open a web browser and navigate to `http://localhost:8002` to access the backend
- Open a web browser and navigate to `http://localhost:5433` to access the PostgreSQL




