# FormsController E2E Test Summary

This document explains the setup, imports, and mocks used in the `forms.e2e-spec.ts` test file designed to verify the `JwtAuthGuard` protection on the `FormsController`.

## Test Objective
The primary goal is to verify that the `GET /forms` route is protected by authentication.
- **Unauthorized Request**: Should return `401 Unauthorized` if no valid token is provided.
- **Authorized Request**: Should return `200 OK` (and data) if a valid JWT is provided.

## Imports and Setup

### 1. `TestingModule` Configuration
We use `Test.createTestingModule` to create an isolated NestJS application context for testing. This allows us to load only the necessary components and mock the rest, making tests faster and independent of external systems (like databases).

```typescript
const moduleFixture: TestingModule = await Test.createTestingModule({
  imports: [ ... ],
  controllers: [FormsController],
  providers: [ ... ],
}).compile();
```

### 2. Authentication Modules (`PassportModule`, `JwtModule`)
To make the `JwtAuthGuard` work, the testing module needs the standard NestJS authentication infrastructure.
- **`PassportModule`**: Required because `JwtAuthGuard` extends `AuthGuard('jwt')`, which relies on Passport.
- **`JwtModule`**: Required to sign and verify tokens. We register it with the same secret used in the actual application (`jwtConstants.secret`) so that tokens generated in the test are considered valid by the guard.

### 3. `JwtStrategy`
We provide the real `JwtStrategy` instead of mocking it.
- **Reason**: We want to test the *integration* of the guard. By using the real strategy, we ensure that the token parsing and validation logic works exactly as it does in the real app.
- **Dependency**: The `JwtStrategy` depends on `AuthService` and `UsersService` (to validate the payload), which is why we must mock those services.

## Mocks

We use mocks to replicate the behavior of services without connecting to a real database.

### 1. `FormsService` (Mock)
- **Reason**: The `FormsController` delegates business logic to `FormsService`. We don't want to test the service logic here (that belongs in unit tests) or connect to the DB.
- **Implementation**: A simple object with `jest.fn()` mocks.
  ```typescript
  const mockFormsService = {
    findAll: jest.fn().mockResolvedValue([{ id: 1, name: 'Test Form' }]),
    // ...
  };
  ```

### 2. `UsersService` (Mock)
- **Reason**: The `JwtStrategy` calls `this.userService.findById(payload.sub)` to validate that the user exists.
- **Implementation**: We mock `findById` to always return a user object when called. This ensures the strategy successfully validates the token.
  ```typescript
  const mockUsersService = {
    findById: jest.fn().mockImplementation((id) => Promise.resolve({ id, username: 'testuser' })),
  };
  ```

### 3. `AuthService` (Mock)
- **Reason**: `JwtStrategy` injects `AuthService`. Even if we don't explicitly call its methods in this specific test flow, the dependency injection container requires it to be present to instantiate `JwtStrategy`.
- **Implementation**: An empty object `{}` is sufficient if no methods are called, or mocked methods if needed.

## Test Cases

### 1. `should return 401 without token`
- Verifies that the guard blocks requests with no `Authorization` header.

### 2. `should return 200 with valid token`
- Verifies that the guard allows requests with a valid Bearer token.
- We use `app.get(JwtService).sign(...)` to generate a real, valid signature for the test user, ensuring it passes the `JwtStrategy` verification.
