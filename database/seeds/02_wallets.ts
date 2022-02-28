import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex("wallets").del();

    // Inserts seed entries
    await knex("wallets").insert([
        { id: 1, balance: 5000, userId: 1 },
        { id: 2, balance: 3500, userId: 2 },
        { id: 3, balance: 7800, userId: 3 }
    ]);
};
