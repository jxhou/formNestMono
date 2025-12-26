import type { SequelizeOptions } from 'sequelize-typescript';
import { createRequire } from 'module';
// @ts-ignore
const localRequire = createRequire(import.meta.url);
const { User } = localRequire('../users/models/user.model');

import 'dotenv/config';

const databaseConfig: SequelizeOptions = {
  dialect: 'postgres',
  host: process.env.DB_HOST || 'localhost', // Use 'postgres' if running in docker-compose network
  port: process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : 5432,
  username: process.env.DB_USERNAME || 'devuser',
  password: process.env.DB_PASSWORD || 'devpass',
  database: process.env.DB_DATABASE || 'devdb',
  models: [User],
  // sync: { alter: true } should be disabled when using migrations
};

// This CommonJS export is used by config/config.js for sequelize-cli
try {
  // @ts-ignore
  module.exports = {
    development: databaseConfig,
    test: databaseConfig,
    production: databaseConfig,
  };
} catch {}

// This ES Module export is for the NestJS application
export default databaseConfig;