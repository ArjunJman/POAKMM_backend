# Use the official Node.js image as a base image
FROM node:18-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .


# Expose the port that the app runs on
EXPOSE 3000

# Command to run the app when the container starts
CMD ["npm", "start"]
