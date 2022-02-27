import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
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
        })

}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable('transactions').dropTable('wallets').dropTable('users');
}

