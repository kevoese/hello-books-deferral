// Update with your config settings.
require("dotenv").config();

module.exports = {
  development: {
    client: process.env.DATABASE_CLIENT,
    connection: process.env.DATABASE_URL,
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: "knex_migrations",
      directory: "./server/migrations"
    }
  },

  test: {
    client: process.env.TEST_DATABASE_CLIENT,
    connection: process.env.TEST_DATABASE_URL,
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
<<<<<<< HEAD
      tableName: "knex_migrations"
=======
      tableName: 'knex_migrations',
      directory: './server/migrations'
>>>>>>> feat: send detailed signup error/success messages
    }
  },

  staging: {
    client: process.env.DATABASE_CLIENT,
    connection: process.env.DATABASE_URL,
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
<<<<<<< HEAD
      tableName: "knex_migrations"
=======
      tableName: 'knex_migrations',
      directory: './server/migrations'
>>>>>>> feat: send detailed signup error/success messages
    }
  },

  production: {
    client: process.env.DATABASE_CLIENT,
    connection: process.env.DATABASE_URL,
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
<<<<<<< HEAD
      tableName: "knex_migrations"
=======
      tableName: 'knex_migrations',
      directory: './server/migrations'
>>>>>>> feat: send detailed signup error/success messages
    }
  }
};
