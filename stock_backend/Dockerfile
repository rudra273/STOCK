# Build stage
FROM python:3.9-alpine AS builder

# Set environment variables
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

# Set work directory
WORKDIR /app

# Install build dependencies
COPY requirements.txt .
RUN apk add --no-cache --virtual .build-deps \
    gcc musl-dev postgresql-dev && \
    pip install --no-cache-dir -r requirements.txt && \
    apk del .build-deps

# Copy project files
COPY . .

# Runtime stage
FROM python:3.9-alpine

# Set work directory
WORKDIR /app

# Copy built Python packages from the previous stage
COPY --from=builder /usr/local /usr/local

# Copy project files
COPY . .

# Run database migrations and start the application
CMD ["sh", "-c", "python manage.py makemigrations && python manage.py migrate && python manage.py runserver 0.0.0.0:8000"]




# # Base image
# FROM python

# # Set environment variables
# ENV PYTHONDONTWRITEBYTECODE=1
# ENV PYTHONUNBUFFERED=1

# # Set work directory
# WORKDIR /app

# # Install dependencies
# COPY requirements.txt /app/
# RUN pip install --no-cache-dir -r requirements.txt

# # Copy project files
# COPY . /app/

# # Run database migrations and start the application
# CMD ["sh", "-c", "python manage.py makemigrations && python manage.py migrate && python manage.py runserver 0.0.0.0:8000"]

