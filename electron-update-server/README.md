# Electron Update Server

A simple update server for Electron applications using Nginx, designed to work with electron-updater.

## Setup

1. Make sure Docker and Docker Compose are installed
2. Run the server:

```bash
docker compose -f docker-compose.yml up
```

Check server is running [http://localhost:8080](http://localhost:8080):

## Directory Structure

The server will serve release files from the `release` directory with the following structure:

```bash
curl http://localhost:8080/release/latest-mac.yml
```
