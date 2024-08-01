# Dockerfile
FROM python:3.9

WORKDIR /app

COPY script.py /app/
RUN pip install prometheus_client psycopg2

CMD ["python", "script.py"]
