# Specify the base image
FROM node:14

# Set the working directory
WORKDIR /app

# Copy the package.json and package-lock.json files for frontend and backend dependencies
COPY package.json package-lock.json /app/

# Install dependencies for both frontend and backend
RUN npm install

# Copy the client (frontend) source code
COPY client /app/client

# Change working directory to the client folder
WORKDIR /app/client

# Build the frontend
RUN npm run build

# Change working directory to the server folder
WORKDIR /app/server

# Copy the server (backend) source code
COPY server /app/server

# Expose the port on which your backend server will run (assuming it's port 5000)
EXPOSE 5000

# Set the command to start the backend server
CMD [ "node", "server.js" ]
