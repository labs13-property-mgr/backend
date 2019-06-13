require('dotenv').config()
const dbConnection = process.env.DATABASE_URL
console.log(dbConnection)
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
  testing: {
    client: 'sqlite3',
    connection: {
      filename: './data/test.db3'
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
    useNullAsDefault: true,
    migrations: { directory: __dirname + '/data/migrations' },
    seeds: { directory: __dirname + '/data/seeds' }
  }
}
