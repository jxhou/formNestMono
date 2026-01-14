# GraphQL Integration Testing Guide

This guide describes how to write and run integration tests for GraphQL endpoints in this project.

## Overview

The testing infrastructure uses:
- **NestJS Testing**: For creating the application context.
- **Supertest**: For sending HTTP requests to the GraphQL endpoint.
- **Testcontainers**: To provide a real, ephemeral PostgreSQL database for each test run.
- **Jest**: As the test runner and assertion library.

## Project Structure

- `test/setup/`: Lower-level setup helpers.
  - `setup-test-database.ts`: Manages the PostgreSQL Docker container.
  - `create-test-app.ts`: Bootstraps the NestJS app with GraphQL and Sequelize.
  - `gql-request.ts`: Utility for making GraphQL POST requests.
- `test/graphQL/`: Integration test suites for GraphQL resolvers.

## Setup Instructions

### 1. Ephemeral Database (`setup-test-database.ts`)
The project uses `@testcontainers/postgresql` to ensure tests run against a clean database instance. 
- It starts a `postgres:16-alpine` container.
- It returns connection details and a `stop()` method to terminate the container.

### 2. Creating the Test App (`create-test-app.ts`)
The `createTestApp` helper automates the boilerplate:
- Starts the database container.
- Configures `SequelizeModule` with `synchronize: true` to automatically create tables based on your models.
- Configures `GraphQLModule` with `ApolloDriver`.
- Accepts additional modules to import (e.g., `FormsModule`).

### 3. Helping with Requests (`gql-request.ts`)
The `gqlRequest` helper simplifies sending queries:
```typescript
const res = await gqlRequest(app, query, variables);
```

## How to Write a New GraphQL Test

Create a file ending in `.integration.e2e-spec.ts` (e.g., `test/graphQL/my-feature.integration.e2e-spec.ts`).

### Basic Template

```typescript
import { createTestApp } from '../setup/create-test-app';
import { gqlRequest } from '../setup/gql-request';
import { MyModule } from '../../src/my-feature/my.module';
import { MyModel } from '../../src/my-feature/models/my.model';

describe('My Feature GraphQL (integration)', () => {
  let app;
  let db;
  
  // Increase timeout for container startup
  jest.setTimeout(120000);

  beforeAll(async () => {
    const test = await createTestApp([MyModule]);
    app = test.app;
    db = test.db;

    // Seed data directly using models
    await MyModel.create({ name: 'Test Item' });
  });

  afterAll(async () => {
    await app.close();
    await db.stop();
  });

  it('queries my feature', async () => {
    const query = `
      query {
        getItems {
          id
          name
        }
      }
    `;

    const res = await gqlRequest(app, query);

    expect(res.status).toBe(200);
    expect(res.body.data.getItems[0].name).toBe('Test Item');
  });
});
```

## Running Tests

To run the GraphQL integration tests, use the following command:

```bash
npm run test:e2e -- test/graphQL

--- run specific test:
npm run test:e2e test/graphQL/form.integration.e2e-spec.ts
```

Debug particular test from vscode:
--- select the test file, and then select "Debug E2E Jest: Current File", from the run and debug view.

or
--- npm run test:e2e:debug, and then 
--- attach to the process in vscode



*Note: Ensure Docker is running on your machine as Testcontainers requires it.*
