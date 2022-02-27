import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex("transactions").del();

    // Inserts seed entries
    await knex("transactions").insert([
        { id: 1, userId: 1, amount: 2350, type: "credit", actionType: "self_funded", creditorId: null, receiverId: null },
        { id: 2, userId: 2, amount: 2500, type: "debit", actionType: "transfer", creditorId: null, receiverId: 4 },
        { id: 3, userId: 3, amount: 1000, type: "debit", actionType: "withdraw", creditorId: null, receiverId: null },
        { id: 4, userId: 4, amount: 2500, type: "credit", actionType: "benefactor_funded", creditorId: 2, receiverId: null },
    ]);
};
