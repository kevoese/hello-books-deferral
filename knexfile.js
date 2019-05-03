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
      tableName: "knex_migrations",
      directory: "./server/migrations"
    }
  },

  review: {
    client: process.env.DATABASE_CLIENT,
    connection: process.env.BACKUP_DATABASE,
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: "knex_migrations",
      directory: "./server/migrations"
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
      tableName: "knex_migrations",
      directory: "./server/migrations"
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
      tableName: "knex_migrations",
      directory: "./server/migrations"
    }
  }
};
