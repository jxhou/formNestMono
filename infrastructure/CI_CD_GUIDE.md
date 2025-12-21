# CI/CD Setup Guide

This guide explains how to set up Continuous Integration and Continuous Deployment (CI/CD) pipelines for your project. We will focus on **GitHub Actions** as it is the most common choice, but the concepts apply to GitLab CI, Jenkins, etc.

## Overview

A typical CI/CD pipeline for this stack (React + NestJS + Docker) consists of two main stages:

1.  **Continuous Integration (CI)**: Runs on every Pull Request or Push.
    *   **Linting**: Check code style.
    *   **Testing**: Run unit and e2e tests.
    *   **Build Verification**: Ensure the code compiles and Docker images build.

2.  **Continuous Deployment (CD)**: Runs on push to the `main` branch.
    *   **Build Images**: Build production Docker images.
    *   **Push Registry**: Push images to a registry (Docker Hub, GHCR, AWS ECR).
    *   **Deploy**: Update the production server (via SSH, Kubernetes, etc.).

## Recommended Workflow (GitHub Actions)

Create a file at `.github/workflows/ci-cd.yml` in your repository root.

### 1. Define Triggers
```yaml
name: CI/CD Pipeline

on:
  push:
    branches: [ "main" ]
  pull_request:
    branches: [ "main" ]
```

### 2. Frontend Job
```yaml
jobs:
  frontend-ci:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v4
    
    - name: Setup Node.js
      uses: actions/setup-node@v4
      with:
        node-version: '20'
        cache: 'npm'
        cache-dependency-path: react-vite/package-lock.json

    - name: Install Dependencies
      working-directory: ./react-vite
      run: npm ci

    - name: Lint
      working-directory: ./react-vite
      run: npm run lint

    # - name: Test
    #   working-directory: ./react-vite
    #   run: npm test

    - name: Build
      working-directory: ./react-vite
      run: npm run build
```

### 3. Backend Job
```yaml
  backend-ci:
    runs-on: ubuntu-latest
    services:
      # Service containers to run with `backend-ci`
      postgres:
        image: postgres:15
        env:
          POSTGRES_USER: devuser
          POSTGRES_PASSWORD: devpass
          POSTGRES_DB: testdb
        ports:
          - 5432:5432
      redis:
        image: redis:alpine
        ports:
          - 6379:6379

    steps:
    - uses: actions/checkout@v4
    
    - name: Setup Node.js
      uses: actions/setup-node@v4
      with:
        node-version: '20'
        cache: 'npm'
        cache-dependency-path: survey-form/package-lock.json

    - name: Install Dependencies
      working-directory: ./survey-form
      run: npm ci

    - name: Lint
      working-directory: ./survey-form
      run: npm run lint

    - name: Test
      working-directory: ./survey-form
      env:
        DATABASE_HOST: localhost
        DATABASE_PORT: 5432
        DATABASE_USER: devuser
        DATABASE_PASSWORD: devpass
        DATABASE_DB: testdb
        REDIS_HOST: localhost
      run: npm run test
```

### 4. Docker Build & Push (CD)
This job runs only on the `main` branch after CI passes.

```yaml
  docker-build-push:
    needs: [frontend-ci, backend-ci]
    if: github.ref == 'refs/heads/main'
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v4

    - name: Login to Docker Hub
      uses: docker/login-action@v3
      with:
        username: ${{ secrets.DOCKERHUB_USERNAME }}
        password: ${{ secrets.DOCKERHUB_TOKEN }}

    - name: Build and Push Frontend
      uses: docker/build-push-action@v5
      with:
        context: ./react-vite
        push: true
        tags: your-username/survey-frontend:latest

    - name: Build and Push Backend
      uses: docker/build-push-action@v5
      with:
        context: ./survey-form
        push: true
        tags: your-username/survey-backend:latest
```

## Next Steps
1.  **Choose a Provider**: GitHub Actions, GitLab CI, etc.
2.  **Set Secrets**: Configure `DOCKERHUB_USERNAME` and `DOCKERHUB_TOKEN` in your repo settings.
3.  **Implement**: Create the workflow file.

Would you like me to scaffold this GitHub Actions workflow for you?
