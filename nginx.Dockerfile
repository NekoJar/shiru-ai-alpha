# Use the official Nginx image from the Docker Hub
FROM nginx:alpine

# Copy the custom Nginx configuration file to the container
COPY nginx.conf /etc/nginx/conf.d/default.conf
