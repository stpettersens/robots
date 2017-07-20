#
# Dockerfile for robots service:
# robots
#

# Use Node.js preinstalled container.
FROM saintpettersens/docker-nodejs:latest

# Maintainer of this project.
MAINTAINER Sam Saint-Pettersen <s.stpettersen+github@gmail.com>

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
