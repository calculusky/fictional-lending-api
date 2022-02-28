"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
const config_1 = require("./src/config/config");
const db = config_1.connection.db;
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
};
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
};
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
};
exports.default = { test, development, production };
//# sourceMappingURL=knexfile.js.map