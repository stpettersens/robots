#
# Dockerfile for robots service:
# robots
#

# Use Node.js preinstalled image as base.
FROM saintpettersens/docker-nodejs:latest

# Maintainer of this project.
MAINTAINER Sam Saint-Pettersen <s.stpettersen+github@gmail.com>

# Check Node.js and npm versions.
RUN echo "node $(node --version)" && echo "npm v$(npm --version)"

# Install `dig`.
RUN apt-get update && apt-get install -y dnsutils

# Expose the app on port 8075 ("BOTS").
EXPOSE 8075

# Create app directory.
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Bundle app src
COPY . /usr/src/app

# Install all dependencies for app.
RUN npm install

# Configure hostname for own robots.txt file.
RUN npm run configure

# Deploy clientside JavaScript + CSS.
RUN npm run dist

# Clobber node_modules/ and clientside/;
# install only production dependencies.
RUN rm -r -f node_modules/
RUN rm -r -f clientside/
RUN npm install --production

# Serve app.
CMD ./core/robots | node app.js
