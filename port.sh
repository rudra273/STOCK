kubectl port-forward svc/backend -n stock-app 8002:8000 &
kubectl port-forward svc/frontend -n stock-app 3002:3000 &
kubectl port-forward svc/prometheus -n stock-app 9002:9090 &
kubectl port-forward svc/grafana -n stock-app 3005:3000 &
kubectl port-forward svc/postgres 5433:5432 -n stock-app &


echo "All services are deployed and port forwarding is set up."