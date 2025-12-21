import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import 'dotenv/config'
import session from 'express-session';
import { RedisStore } from "connect-redis"
import passport from 'passport';
import { createClient } from 'redis';

async function bootstrap() {
  const sessionKey = process.env.SESSION_SECRET || 'secret';

  const app = await NestFactory.create(AppModule);

  // Setup session management, using redis as session store, and integrating with passport
  // Initialize Redis client and store
  const redisClient = createClient({
    // url: process.env.REDIS_URL || 'redis://localhost:6379',
    url: `redis://${process.env.REDIS_HOST || 'localhost'}:6379`
  });
  await redisClient.connect();

  // create redis session store
  const redisStore = new RedisStore({
    client: redisClient,
    prefix: 'session:',
  });

  // add session support via express-session
  app.use(
    session({
      store: redisStore,  // use redis as session store instead of default memory store
      secret: sessionKey, 
      resave: false,
      saveUninitialized: false,
      cookie: {
        maxAge: 3600000, // 1 hour
      },
    }),
  );

  // Initialize Passport
  app.use(passport.initialize());
  // Initialize Passport session, allow passport to integrate with express-session.
  // in this case, passport LocalStrategy will trigger session flow.
  app.use(passport.session());

  await app.listen(process.env.PORT ?? 3000);
  console.log(process.env);
}
bootstrap();
