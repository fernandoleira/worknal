# syntax=docker/dockerfile:1

#
# BUILD
#

# Pull golang image to build binary
FROM golang:1.19 AS build

# Set the working directory in /build
WORKDIR /build

# Copy all the files from the backend service folder
COPY ./ ./

# Download and verify mod and build pocketbase
RUN go mod download && go mod verify
RUN go build -v -o pocketbase .

#
# DEPLOY
#

# Pull ubuntu image to run backend
FROM ubuntu:latest

# Set the working directory in /build
WORKDIR /app

# Copy the pocketbase binary from the build image
COPY --from=build /build/pocketbase /app

# Expose the port to tcp and run serve cmd
EXPOSE 8090/tcp
CMD ["./pocketbase", "serve", "--http", "0.0.0.0:8090"]