#!/bin/sh
# Run the application outside of Docker container.
# Uses daemonize: http://software.clapper.org/daemonize
daemonize -c $(pwd) .$(pwd)/core/robots
daemonize -c $(pwd) /usr/bin/node app.js
