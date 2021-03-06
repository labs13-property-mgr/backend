require('dotenv').config();
const pg = require('pg')
pg.defaults.ssl = true
module.exports = {
  development: {
    client: 'sqlite3',
    connection: {
      filename: './data/db.db3'
    },
    useNullAsDefault: true,
    migrations: {
      directory: './data/migrations'
    },
    seeds: {
      directory: './data/seeds'
    }
  },
  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL,
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: './data/migrations'
    },
    seeds: {
      directory: './data/seeds'
    }
  }
};

//use the (npx knex migrate:rollback --env production) to rollback and migrate latest on heroku using the configurations in this knex file 