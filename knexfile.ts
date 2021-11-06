const dotenv = require('dotenv');
dotenv.config({
  path: '.env'
});

module.exports = {
  development: {
    client: "mysql",
    connection: {
      database: process.env.DB_NAME,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD
    },
    migrations: {
      tableName: "knex_migrations",
      directory: './src/database/migrations'
    },
    seeds: {
      directory: './src/database/seeds'
    }
  },
};
