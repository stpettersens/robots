#
# Dockerfile for robots service:
# robots
#

# Use Docker optimized Ubuntu 16.04 LTS as base.
FROM phusion/baseimage:latest
# FROM saintpettersens/docker-nodejs:latest

# Maintainer of this project.
MAINTAINER Sam Saint-Pettersen <s.stpettersen+github@gmail.com>

# Install Node.js.
RUN curl -sL https://deb.nodesource.com/setup_8.x | bash -
RUN apt-get update && apt-get install -y nodejs
RUN echo "node $(node --version)" && echo "npm $(npm --version)"

# Expose the app on port 8075 ("BOTS").
EXPOSE 8075

# Create app directory.
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Bundle app src
COPY . /usr/src/app

# Install all dependencies for app.
RUN npm install

# Deploy clientside JavaScript + CSS.
RUN npm run dist

# Clobber node_modules/ and clientside/;
# install only production dependencies.
RUN rm -r -f node_modules/
RUN rm -r -f clientside/
RUN npm install --production

# Serve app.
CMD ./core/robots | node app.js
