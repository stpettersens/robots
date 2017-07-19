#
# Dockerfile for robots service:
# robots
#

# Use streamlined Ubuntu image based on 16.04 LTS as base.
FROM phusion/baseimage:latest

# Maintainer of this project.
MAINTAINER Sam Saint-Pettersen <s.stpettersen+github@gmail.com>

# Set as production environment.
#ENV NODE_ENV=production

# Install Node.js and Rust.
RUN curl -sL https://deb.nodesource.com/setup_8.x | bash -
RUN apt-get update && apt-get install -y nodejs
RUN curl https://sh.rustup.rs -sSf | sh -s -- -y
RUN echo "node $(node --version)" && echo "npm $(npm --version)"
RUN rustc --version && cargo --version 

# Expose the app on port 8075 ("BOTS").
EXPOSE 8075

# Create app directory.
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Bundle app src
COPY . /usr/src/app

# Install dependencies for app.
RUN npm install 
#--production

RUN npm run dist

# Build Rust core program -> `robots`.
RUN npm run build

# Serve app.
CMD echo "done!"
#./core/robots | node app.js
