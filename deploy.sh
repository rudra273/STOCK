#!/bin/bash

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

