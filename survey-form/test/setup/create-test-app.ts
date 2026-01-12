// test/setup/create-test-app.ts
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { setupTestDatabase } from './setup-test-database';

export interface TestApp {
  app: INestApplication;
  module: TestingModule;
  db: Awaited<ReturnType<typeof setupTestDatabase>>;
}

export async function createTestApp(
  imports: any[] = [],
  providers: any[] = [],
): Promise<TestApp> {
  // Start ephemeral Postgres
  const db = await setupTestDatabase();

  const module = await Test.createTestingModule({
    imports: [
      SequelizeModule.forRoot({
        dialect: 'postgres',
        host: db.host,
        port: db.port,
        username: db.username,
        password: db.password,
        database: db.database,
        autoLoadModels: true,
        synchronize: true,
        logging: false,
      }),
      GraphQLModule.forRoot<ApolloDriverConfig>({
        driver: ApolloDriver,
        autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      }),
      ...imports,
    ],
    providers,
  }).compile();

  const app = module.createNestApplication();
  await app.init();

  return { app, module, db };
}
