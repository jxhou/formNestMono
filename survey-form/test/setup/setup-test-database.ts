// test/setup/setup-test-database.ts
import { PostgreSqlContainer } from '@testcontainers/postgresql';

export async function setupTestDatabase() {

  const container = await new PostgreSqlContainer("postgres:16-alpine")
    .withStartupTimeout(120000)
    .start();
  

  

  return {
    container,
    host: container.getHost(),
    port: container.getPort(),
    username: container.getUsername(),
    password: container.getPassword(),
    database: container.getDatabase(),
    stop: () => container.stop(),
  };
}
