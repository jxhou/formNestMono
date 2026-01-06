# GraphQL Schema Generation (Code-First)

This project uses the **Code-First** approach provided by NestJS. Instead of manually writing `.graphql` or `.gql` files to define the schema, the schema is automatically generated based on TypeScript classes and decorators.

## How it Works

The application follows a "Chain of Discovery" to build the schema during startup:

### 1. Decorators (The Metadata)
Classes and methods are annotated with specific decorators to define their role in the GraphQL API:
- `@ObjectType()`: Informs NestJS that this class represents a Type in the schema (e.g., `Form`, `FormField`).
- `@Field()`: Marks specific properties that should be exposed.
- `@Resolver()`: Marks a class as a container for Queries and Mutations.
- `@Query()` / `@Mutation()`: Defines the entry points for the API.

### 2. Provider Registration
For a Resolver to be discovered, it must be registered as a **Provider** within a Module.
- Example: `FormsResolver` is registered in `FormsModule`.

### 3. Module Hierarchy
The application has a root module (`AppModule`) that imports all other modules (like `FormsModule`). This creates a complete application tree.

### 4. The Scanning Process
When the `GraphQLModule` initializes in `AppModule`:
1. It scans the entire application dependency tree.
2. It identifies all classes decorated with `@Resolver`.
3. It introspects those resolvers to find their queries and the return types (`ObjectType`s) those queries use.

### 5. Automated File Output
In `app.module.ts`, we configured the module to write the result of this scan to a physical file:

```typescript
GraphQLModule.forRoot<ApolloDriverConfig>({
  driver: ApolloDriver,
  autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
})
```

This ensures that `src/schema.gql` is always in sync with your TypeScript code.

## Advantages
- **Single Source of Truth**: Your TypeScript models are your GraphQL schema.
- **Type Safety**: No mismatch between your TS code and your API definitions.
- **Auto-Sync**: The schema file is updated every time you change a decorator and the server reloads.
