"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const knex_1 = require("knex");
const knexfile_1 = (0, tslib_1.__importDefault)(require("../../knexfile"));
const environment = process.env.NODE_ENV;
const knexConfig = knexfile_1.default[environment];
exports.default = (0, knex_1.knex)(knexConfig);
//# sourceMappingURL=knex.js.map