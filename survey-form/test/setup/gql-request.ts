// test/setup/gql-request.ts
import request from 'supertest';
import { INestApplication } from '@nestjs/common';

export function gqlRequest(
  app: INestApplication,
  query: string,
  variables?: Record<string, any>,
) {
  return request(app.getHttpServer())
    .post('/graphql')
    .send({ query, variables });
}
