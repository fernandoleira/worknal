FROM node:lts-alpine

# Install serve to create an http server to deploy the app.
RUN npm install -g serve

# Change working directory.
WORKDIR /app

# Copy all the files from the worknal project.
COPY ./ ./

# Run npm to install the dependencies and build the app.
RUN npm install
RUN npm run build

# Expose port.
EXPOSE 8080/tcp

# Use the command 'serve' as the entrypoint.
ENTRYPOINT ["serve"]

# Run production app build.
CMD ["-s", "dist", "-p", "8080", "-n"]
