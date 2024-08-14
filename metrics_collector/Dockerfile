# # Dockerfile
# FROM python:3.9

# WORKDIR /app

# COPY script.py /app/
# RUN pip install prometheus_client psycopg2

# CMD ["python", "script.py"]


# Stage 1: Build
FROM python:3.9-alpine as builder

WORKDIR /app

# Install build dependencies
RUN apk add --no-cache gcc musl-dev libffi-dev postgresql-dev

# Copy the requirements file and install dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir --prefix=/install -r requirements.txt

# Stage 2: Final
FROM python:3.9-alpine

WORKDIR /app

# Copy only the necessary files from the builder stage
COPY --from=builder /install /usr/local
COPY script.py /app/

CMD ["python", "script.py"]
