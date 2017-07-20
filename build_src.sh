#!/bin/sh
# Build Docker container.
cp Dockerfile.src Dockerfile
docker build -t robots_app_src .
