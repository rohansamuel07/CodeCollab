# Use Ubuntu as base image
FROM ubuntu:latest

# Install required dependencies
RUN apt update && apt install -y \
    gcc g++ \
    python3 python3-pip \
    nodejs npm \
    openjdk-17-jdk \
    && apt clean

# Set default working directory
WORKDIR /usr/src/app

# Copy package.json & package-lock.json (ensures npm install works)
COPY server/package.json server/package-lock.json ./

# Install dependencies
RUN npm install

# Copy the rest of the server code
COPY server/ .

# Set execution permissions
RUN chmod -R 777 /usr/src/app

# Default command (will be overridden)
CMD ["/bin/bash"]
