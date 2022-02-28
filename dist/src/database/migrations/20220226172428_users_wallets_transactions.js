"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.down = exports.up = void 0;
const tslib_1 = require("tslib");
function up(knex) {
    return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
        return knex.schema.createTable('users', (table) => {
            table.increments('id');
            table.string('firstName').notNullable();
            table.string('lastName').notNullable();
            table.string('email').notNullable().unique();
            table.string('password').notNullable();
            table.timestamp('createdAt').defaultTo(knex.fn.now());
            table.timestamp('updatedAt').defaultTo(knex.fn.now());
            //table.timestamps()
        })
            .createTable('wallets', (table) => {
            table.increments('id');
            table.integer('balance').notNullable().defaultTo(0);
            table.timestamp('createdAt').defaultTo(knex.fn.now());
            table.timestamp('updatedAt').defaultTo(knex.fn.now());
        })
            .createTable('transactions', (table) => {
            table.increments('id');
            table.integer('amount').notNullable();
            table.string('type').notNullable();
            table.string('actionType').notNullable();
            table.timestamp('createdAt').defaultTo(knex.fn.now());
            table.timestamp('updatedAt').defaultTo(knex.fn.now());
        })
            .alterTable('wallets', (table) => {
            table.integer('userId').unsigned().references('id').inTable('users');
        })
            .alterTable('transactions', (table) => {
            table.integer('userId').unsigned().references('id').inTable('users');
            table.integer('creditorId').unsigned().references('id').inTable('users').nullable();
            table.integer('receiverId').unsigned().references('id').inTable('users').nullable();
        });
    });
}
exports.up = up;
function down(knex) {
    return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
        return knex.schema.dropTable('transactions').dropTable('wallets').dropTable('users');
    });
}
exports.down = down;
//# sourceMappingURL=20220226172428_users_wallets_transactions.js.map