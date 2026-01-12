# AGENTS.md - Development Guidelines for Agentic Coding

This file contains comprehensive guidelines for agentic coding agents working in this NestJS/React monorepo.

## Project Overview

This is a monorepo containing:
- **Backend**: NestJS with GraphQL, Sequelize ORM, PostgreSQL
- **Frontend**: React with Vite, TypeScript, Tailwind CSS  
- **Infrastructure**: Docker Compose setup with PostgreSQL, pgAdmin, Redis

## Repository Structure

```
formNestMono/
├── survey-form/          # NestJS backend
├── react-vite/           # React frontend
├── infrastructure/       # Docker configurations
└── AGENTS.md            # This file
```

## Build/Lint/Test Commands

### Backend (survey-form/)
```bash
# Development
npm run start:dev          # Start with hot reload
npm run start:debug        # Start with debugging
npm run start:debug:container # Debug in container

# Building
npm run build              # Build for production
npm run start:prod         # Start production build

# Code Quality
npm run lint               # Run ESLint with auto-fix
npm run format             # Format code with Prettier

# Testing
npm run test               # Run unit tests
npm run test:watch         # Run tests in watch mode
npm run test:cov           # Run with coverage
npm run test:e2e           # Run e2e tests
npm run test:e2e:debug     # Debug e2e tests

# Single Test
npm run test -- --testNamePattern="specific test name"
npm run test -- path/to/test.spec.ts

# Database
npm run db:migrate          # Run Sequelize migrations
npm run db:seed            # Run database seeders
```

### Frontend (react-vite/)
```bash
# Development
npm run dev                # Start dev server
npm run build              # Build for production
npm run preview            # Preview production build

# Code Quality
npm run lint               # Run ESLint
```

## Code Style Guidelines

### TypeScript Configuration
- **Backend**: Strict mode enabled, `noImplicitAny: false`
- **Frontend**: Strict mode enabled
- Target: ES2023 (backend), ES2020 (frontend)
- Decorators enabled for NestJS

### ESLint Rules
```javascript
// Backend specific rules
'@typescript-eslint/no-explicit-any': 'off',
'@typescript-eslint/no-floating-promises': 'warn',
'@typescript-eslint/no-unsafe-argument': 'warn',
"prettier/prettier": ["error", { endOfLine: "auto" }]
```

### Prettier Configuration
```json
{
  "singleQuote": true,
  "trailingComma": "all"
}
```

## Import Conventions

### Order of Imports
1. Node.js built-in modules
2. Third-party libraries (NestJS, GraphQL, etc.)
3. Local modules (absolute imports from `src/`)
4. Relative imports

### Examples
```typescript
// Backend
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { AppService } from './app.service';
import { FormField } from './form-fields/models/form-field.model';

// Frontend  
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Login } from './pages/Login';
```

### Absolute Imports
- Backend: Use `src/` prefix for absolute imports
- Frontend: Use relative imports or configure path aliases

## Naming Conventions

### Files and Folders
- **Modules**: kebab-case (`form-fields/`, `auth/`)
- **Classes**: PascalCase (`FormField`, `UserService`)
- **Files**: kebab-case for features, PascalCase for class files
- **Tests**: `.spec.ts` for unit, `.integration.e2e-spec.ts` for integration

### Code Elements
```typescript
// Classes: PascalCase
export class FormFieldsService {}

// Methods/Variables: camelCase
private readonly formFieldsService;
findAll() {}

// Constants: UPPER_SNAKE_CASE
const MAX_RETRY_ATTEMPTS = 3;

// GraphQL Types: PascalCase
@ObjectType()
export class FormField {}

// Interfaces: PascalCase with I prefix (optional)
interface IFormFieldRepository {}
```

## Backend Patterns

### NestJS Module Structure
```typescript
@Module({
  imports: [SequelizeModule.forFeature([Model1, Model2])],
  controllers: [FeatureController],
  providers: [FeatureService, FeatureResolver],
})
export class FeatureModule {}
```

### GraphQL Resolvers
```typescript
@Resolver(() => ModelType)
export class FeatureResolver {
  constructor(
    private readonly featureService: FeatureService,
    @InjectModel(RelatedModel)
    private relatedModel: typeof RelatedModel,
  ) {}

  @Query(() => [ModelType], { name: 'featureItems' })
  findAll() {
    return this.featureService.findAll({});
  }

  @ResolveField(() => RelatedType, { name: 'related' })
  async getRelated(@Parent() item: ModelType) {
    return this.relatedModel.findByPk(item.relatedId);
  }
}
```

### Sequelize Models
```typescript
@ObjectType()
@Table
export class Model extends Model {
  @Field(() => Int)
  declare id: number;

  @ForeignKey(() => RelatedModel)
  @Column
  @Field(() => Int)
  declare relatedId: number;

  @Column({ defaultValue: true })
  @Field()
  declare active: boolean;

  @BelongsTo(() => RelatedModel)
  @Field(() => RelatedModel)
  declare related: RelatedModel;
}
```

### DTOs
```typescript
export class CreateFeatureDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsBoolean()
  @IsOptional()
  active?: boolean = true;
}
```

## Frontend Patterns

### React Components
```typescript
// Functional components with hooks
const Component: React.FC<PropsType> = ({ prop1, prop2 }) => {
  const [state, setState] = useState<Type>();
  const navigate = useNavigate();

  return (
    <div className="container mx-auto">
      {/* JSX content */}
    </div>
  );
};

export default Component;
```

### Custom Hooks
```typescript
export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  
  // Hook logic
  
  return { user, login, logout };
};
```

### API Services
```typescript
export const authService = {
  login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
    const response = await axios.post('/api/auth/login', credentials);
    return response.data;
  },
};
```

## Testing Guidelines

### Backend Testing
```typescript
// Unit Tests
describe('FeatureService', () => {
  let service: FeatureService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [FeatureService],
    }).compile();
    service = module.get<FeatureService>(FeatureService);
  });

  it('should find all items', async () => {
    const result = await service.findAll({});
    expect(result).toBeDefined();
  });
});

// Integration Tests
describe('Feature GraphQL (integration)', () => {
  let app;
  let db;
  
  jest.setTimeout(120000);

  beforeAll(async () => {
    const test = await createTestApp([FeatureModule]);
    app = test.app;
    db = test.db;
  });

  afterAll(async () => {
    await app.close();
    await db.stop();
  });
});
```

### Frontend Testing
```typescript
// Component Tests
describe('Component', () => {
  it('renders correctly', () => {
    render(<Component prop1="value" />);
    expect(screen.getByText('expected text')).toBeInTheDocument();
  });
});
```

## Error Handling

### Backend
```typescript
// Use NestJS built-in exceptions
throw new NotFoundException('Item not found');
throw new BadRequestException('Invalid input');
throw new UnauthorizedException('Access denied');

// GraphQL error handling
@Query(() => ModelType)
async findOne(@Args('id') id: number) {
  try {
    return await this.service.findOne(id);
  } catch (error) {
    throw new GraphQLError('Failed to fetch item', {
      extensions: { code: 'INTERNAL_ERROR' },
    });
  }
}
```

### Frontend
```typescript
// Error boundaries
class ErrorBoundary extends React.Component {
  // Implementation
}

// Async error handling
const fetchData = async () => {
  try {
    const response = await service.getData();
    setData(response.data);
  } catch (error) {
    setError(error.message);
  }
};
```

## Database Patterns

### Sequelize Best Practices
- Use decorators for model definitions
- Implement proper foreign key relationships
- Use scopes for common queries
- Exclude sensitive fields with default scopes

### Migration and Seeding
```bash
# Create migration
npx sequelize-cli migration:generate --name migration-name

# Run migrations
npm run db:migrate

# Create seeder
npx sequelize-cli seed:generate --name seeder-name

# Run seeders
npm run db:seed
```

## Security Guidelines

### Backend Security
- Use Helmet middleware for security headers
- Implement proper authentication with JWT
- Validate all input with class-validator
- Use environment variables for sensitive data

### Frontend Security
- Never store sensitive data in localStorage
- Use HTTPS in production
- Implement proper CSRF protection
- Validate data on both client and server

## Docker Development

### Infrastructure Commands
```bash
# Production setup
cd infrastructure && docker-compose up -d

# Local development with hot reload
cd infrastructure && docker-compose -f docker-compose.dev.yml up --build

# Access services
# Backend: localhost:3000
# Frontend: localhost:80
# pgAdmin: localhost:8080
```

## Environment Variables

### Backend (.env)
```bash
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_USERNAME=devuser
DATABASE_PASSWORD=devpass
DATABASE_DB=devdb
JWT_SECRET=your-secret-key
REDIS_URL=redis://localhost:6379
```

### Common Issues and Solutions

1. **Testcontainers timeout**: Ensure Docker is running
2. **Sequelize sync issues**: Check database connection
3. **GraphQL schema not updating**: Restart dev server
4. **CORS issues**: Check CORS middleware configuration

## Development Workflow

1. Create feature branch from main
2. Run tests to ensure baseline
3. Implement changes following patterns
4. Run lint and format
5. Run tests with coverage
6. Commit with conventional messages
7. Create pull request for review

This file should be updated as patterns evolve and new best practices emerge.