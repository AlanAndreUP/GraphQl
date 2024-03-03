// knexfile.js
module.exports = {
    development: {
      client: 'mysql',
      connection: {
        database: 'zooanimals',
        user:     'root',
        password: 'Jaguares34.'
      },
      migrations: {
        tableName: 'knex_migrations',
        directory: __dirname + '/src/db/migrations',
      },
      seeds: {
        directory: __dirname + '/src/db/seeds',
      },
    },
  };
  