# Delete Deployments and Services
kubectl delete -f deployments/metrics-collector.yml
kubectl delete -f deployments/grafana.yml
kubectl delete -f deployments/prometheus.yml
kubectl delete -f deployments/frontend.yml
kubectl delete -f deployments/backend.yml
kubectl delete -f deployments/postgres.yml

# Delete ConfigMaps
kubectl delete -f grafana-configmap.yml
kubectl delete -f prometheus-configmap.yml

# Delete Persistent Volume Claim
kubectl delete -f db-pvc.yml

# Delete namespace (this will delete all resources within the namespace)
kubectl delete -f namespace.yml
