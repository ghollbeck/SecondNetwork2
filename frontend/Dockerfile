# Use the official Node.js image from the Docker Hub
FROM node:22

# Set the working directory in the container
WORKDIR /app

# Copy package.json
COPY build ./build

# Install serve to serve the build
RUN npm install -g serve

# Expose the port serve runs on
EXPOSE 3000

# Define the command to run the application
CMD ["serve", "-s", "build", "-l", "3000"]
