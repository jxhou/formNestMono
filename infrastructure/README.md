# Infrastructure Documentation

This directory contains the Docker Compose configuration to run the entire application stack (Frontend, Backend, Database, Redis).

## Prerequisites

- [Docker](https://docs.docker.com/get-docker/)
- [Docker Compose](https://docs.docker.com/compose/install/)

## Quick Start

To start all services in the background:

```bash
docker-compose up -d
```

or 

start/stop all containers via docker desktop in Windows environment.


## Local Development

For local development with hot reloading, use the `docker-compose.dev.yml` file.

### Start Development Environment
```bash
docker-compose -f docker-compose.dev.yml up --build
```

### Development Service Access
| Service | URL | Description |
|---------|-----|-------------|
| **Frontend** | [http://localhost:5173](http://localhost:5173) | React app with HMR |
| **Backend API** | [http://localhost:3000](http://localhost:3000) | NestJS API with auto-restart |
| **Backend Debug** | [http://localhost:9229](http://localhost:9229) | NestJS Debug port |
| **PgAdmin** | [http://localhost:8080](http://localhost:8080) | PostgreSQL Admin UI |

### Features
- **Hot Reloading**: Changes to `react-vite/src` or `survey-form/src` will automatically trigger updates.
- **Isolated Dependencies**: `node_modules` are managed inside the container to prevent conflicts.

## Service Access

Once the containers are running, you can access the services at the following URLs:

| Service | URL | Description |
|---------|-----|-------------|
| **Frontend** | [http://localhost:80](http://localhost:80) | The React application |
| **Backend API** | [http://localhost:3000](http://localhost:3000) | The NestJS API server |
| **PgAdmin** | [http://localhost:8080](http://localhost:8080) | PostgreSQL Admin UI |

### Credentials
- **PgAdmin**:
  - Email: `admin@test.com`
  - Password: `adminpass`
- **Postgres**:
  - User: `devuser`
  - Password: `devpass`
  - Database: `devdb`
- **Redis**:
  - Host: `localhost`
  - Port: `6379`

### Access
- **PgAdmin login**:
  - URL: [http://localhost:8080](http://localhost:8080)
  - Email: `admin@test.com`
  - Password: `adminpass`
- **connect to Postgres**:
  - add new server
    - in general tab
      - name: `postgres.local` (or any name you like)
    -in connection tab
      - host: `postgres` (the service name in docker-compose.yml)
      - port: `5432`
      - user: `devuser`
      - password: `devpass`
- **Redis**:
  - URL: [http://localhost:6379](http://localhost:6379)

## Common Commands

### Start Services
Start all services in detached mode (background):
```bash
docker-compose up -d
```

### Stop Services
Stop all running containers:
```bash
docker-compose stop
```

### Stop and Remove Containers
Stop containers and remove them (preserves volumes):
```bash
docker-compose down
```

### View Logs
View logs for all services:
```bash
docker-compose logs -f
```

View logs for a specific service (e.g., backend):
```bash
docker-compose logs -f backend
```

### Rebuild Services
If you make changes to the code (frontend or backend) or Dockerfiles, you need to rebuild the images:

Rebuild all services:
```bash
docker-compose up -d --build
```

Rebuild a specific service (e.g., frontend):
```bash
docker-compose up -d --build frontend
```

### Clean Up
Stop containers, remove them, and remove network (WARNING: This does not remove volumes by default):
```bash
docker-compose down
```

To remove volumes as well (WARNING: This deletes database data):
```bash
docker-compose down -v
```
