#!/bin/bash

set -e  # Exit immediately if a command exits with a non-zero status

# Prompt the user for input
echo "Choose the deployment:"
echo "1. Frontend"
echo "2. Backend"
read -p "Enter choice (1 or 2): " CHOICE

if [ "$CHOICE" == "1" ]; then
  IMAGE_NAME="stock-frontend"
  DIR_PATH="./stock-dashboard"
elif [ "$CHOICE" == "2" ]; then
  IMAGE_NAME="stock-backend"
  DIR_PATH="./stock_backend"
else
  echo "Invalid choice. Exiting."
  exit 1
fi

# Prompt the user for the version tag
read -p "Enter version tag (e.g., 1.2, 3.5): " VERSION_TAG

# Validate version tag
if [ -z "$VERSION_TAG" ]; then
  echo "Version tag cannot be empty. Exiting."
  exit 1
fi

# Define variables
IMAGE_REGISTRY="rudra273"
HELM_RELEASE_NAME="stock-dashboard"
CHART_PATH="./stock_helm"  # Path to your Helm chart

# Function to build, push Docker image, and run Helm upgrade
build_and_deploy() {
  local IMAGE_NAME=$1
  local DIR_PATH=$2
  local TAG=$3

  # Build the Docker image with the specified tag
  echo "Building Docker image with tag $TAG..."
  docker build -t $IMAGE_REGISTRY/$IMAGE_NAME:$TAG $DIR_PATH

  # Push the Docker image
  echo "Pushing Docker image..."
  docker push $IMAGE_REGISTRY/$IMAGE_NAME:$TAG

  # Run Helm upgrade using the latest image
  echo "Running Helm upgrade..."
  helm upgrade $HELM_RELEASE_NAME $CHART_PATH
}

# Build, push Docker image, and run Helm upgrade
build_and_deploy $IMAGE_NAME $DIR_PATH $VERSION_TAG

