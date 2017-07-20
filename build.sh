#!/bin/sh
# Build Docker container.
cp Dockerfile.prebuilt Dockerfile
docker build -t robots .
