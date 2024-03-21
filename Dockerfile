# Use a Node.js base image
FROM node:14

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the uploads folder to the container
COPY uploads ./uploads

# Copy the rest of the application files to the container
COPY . .

# Command to run the application
CMD ["npm", "start"]
