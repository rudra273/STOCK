# # Stage 1: Build the application
# FROM node:18.17.0-alpine AS builder

# # Set the working directory
# WORKDIR /app

# # Copy package.json and package-lock.json
# COPY package.json package-lock.json ./

# # Install dependencies
# RUN npm install

# # Copy the rest of the application code
# COPY . /app/

# # Build the application
# RUN npm run build

# # Stage 2: Production image
# FROM node:18.17.0-alpine

# # Set the working directory
# WORKDIR /app

# # Copy only the necessary files from the builder stage
# COPY --from=builder /app/.next ./.next
# COPY --from=builder /app/public ./public
# COPY --from=builder /app/next.config.mjs ./next.config.mjs

# # Copy package.json and package-lock.json
# COPY package.json package-lock.json ./

# # Install only production dependencies
# RUN npm install --production

# # Expose the port
# EXPOSE 3000

# # Run the application
# CMD ["npm", "run", "start"]




# Base image
FROM node:18.17.0-alpine

# Set work directory
WORKDIR /app

# Install dependencies
COPY package.json package-lock.json /app/
RUN npm install

# Copy project files
COPY . /app/

# Build the application
RUN npm run build

# Expose the port
EXPOSE 3000

# Run the application
CMD ["npm", "run", "dev"]

