module.exports = {

  development: {
    client: "mysql",
    connection: {
      database: "julie-help",
      user: "root",
      password: "root"
    },
    migrations: {
      tableName: "knex_migrations"
    }
  },

};
