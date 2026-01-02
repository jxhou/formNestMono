# monorepo Documentation

This monorepo has three main components: 
-- A backend of surveyForm in NestJS
-- A minimum react app in vite as testing backend route
-- A infrastructure folder mainly configure the entire system along with supporting postgreSQL, pgadmin, and, Redis using docker-compose.


## Infrastructure
-- go to infrastructure folder, then run docker-compose up -d to start all services in the background.
To access pgadmin: localhost:8080

-- See more detail in infrastructure/README.md

## Survey-form
run sequelize-cli seeder to add a default admin user:
-- user: admin
-- password: adminpass

```bash
npx sequelize-cli db:seed:all
```
-- See more docs in survey-form/docs

-- See more detail in survey-form/docs/frontend-auth-guide.md

## react-vite
To access the frontend go to: localhost:80 
may use admin user to login
or
register a new user
