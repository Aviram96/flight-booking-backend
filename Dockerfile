# Use Node.js as the base image
FROM node:18

# Set the working directory in the container
WORKDIR /app

# Copy the package files first to leverage Docker caching
COPY package*.json ./

# Install the dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the port your server runs on
EXPOSE 5000

# Start the application
CMD ["npm", "start"]