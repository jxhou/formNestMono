# GraphQL Implementation Summary

This document summarizes the GraphQL integration into the `survey-form` project.

## Architecture
- **Approach**: Code-First (NestJS)
- **Engine**: Apollo Server 4
- **Driver**: Apollo Driver
- **Schema**: Automatically generated at `src/schema.gql`

## Dependencies
The following core packages were added:
- `@nestjs/graphql`, `@nestjs/apollo`: NestJS wrappers for GraphQL and Apollo.
- `@apollo/server`, `graphql`: Core Apollo and GraphQL engines.
- `@as-integrations/express5`: Required for compatibility with NestJS 11/Express 5.

## Implementation Details

### 1. Model Decorators
Both `Form` and `FormField` models were updated to act as GraphQL Object Types using:
- `@ObjectType()`: Marks the class as a GraphQL type.
- `@Field()`: Exposes specific properties to the GraphQL schema.
- `declare id: number`: Explicitly declaring the ID field for GraphQL visibility.

This is built on the existing models and decorators from the Sequelize models to combine the best of both worlds.
We could build seperated models for GraphQL and Sequelize models, but it is not necessary.
The existing rest api for both forms and form fields is not affected by this change.

### 2. Forms Resolver
A new `FormsResolver` (`src/forms/forms.resolver.ts`) was created to handle queries:
- `forms`: Fetches all forms, including their fields.
- `form(id)`: Fetches a specific form by ID.

### 3. Service Updates
`FormsService` was updated to implement a proper `findOne(id)` method using Sequelize's `findByPk` with associations included.

### 4. Application Configuration
`AppModule` was configured with:
- `GraphQLModule.forRoot`: Initialized with the Apollo Driver.
- **Apollo Sandbox**: Configured as the modern IDE for local development.
- **CSP Fixes**: `helmet` was configured to whitelist Apollo CDNs to allow the Sandbox interface to load correctly.

## Verification
The implementation can be verified by navigating to:
`http://localhost:3000/graphql`

### Sample Query
--- get all forms
```graphql
query {
  forms {
    id
    name
    formFields {
      name
      type
    }
  }
}
```

--- get a form by id
```graphql
query {
  form(id: 1) {
    id
    name
    formFields {
      name
      type
    }
  }
}
```

or with variables

```graphql
query Form($formId: Int!){
  form(id: $formId){
    id
    name
    formFields {
      name
      type
    }
  }
}

with variables

```json
{
  "formId": 1
}
```
