# STOCK_APP

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




