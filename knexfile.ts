import { config } from 'dotenv';
config();
import { connection } from './src/config/config';


const db = connection.db;

const test = {
  client: 'mysql2',
  connection: {
    host: db.host,
    port: db.port,
    user: db.user,
    password: db.password,
    database: db.database
  },
  migrations: {
    directory: `${__dirname}/src/database/migrations`
  },
  seeds: {
    directory: `${__dirname}/src/database/seeds`
  },
  pool: {
    min: 2,
    max: 10,
  },
}

const development = {
  client: 'mysql2',
  connection: {
    host: db.host,
    port: db.port,
    user: db.user,
    password: db.password,
    database: db.database
  },
  migrations: {
    directory: `${__dirname}/src/database/migrations`
  },
  seeds: {
    directory: `${__dirname}/src/database/seeds`
  },
  pool: {
    min: 2,
    max: 10,
  },
}

const production = {
  client: 'mysql2',
  connection: {
    host: db.host,
    port: db.port,
    user: db.user,
    password: db.password,
    database: db.database
  },
  migrations: {
    directory: `${__dirname}/src/database/migrations`
  },
  seeds: {
    directory: `${__dirname}/src/database/seeds`
  },
  pool: {
    min: 2,
    max: 10,
  },
}

export default { test, development, production }