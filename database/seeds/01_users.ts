import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex("users").del();

    // Inserts seed entries
    const password = '$2a$14$Ea7raIG1/atXQ3tqB24.0.vscp80vuv1/pGpStpShLyrWXMCnFI0e';
    await knex("users").insert([
        { id: 1, firstName: "John", lastName: "Doe", email: "johndoe@test.com", password },
        { id: 2, firstName: "Wilson", lastName: "Smith", email: "wil_smith@test.com", password },
        { id: 3, firstName: "Messi", lastName: "Lionel", email: "messi@test.com", password },
        { id: 4, firstName: "Paul", lastName: "Scholes", email: "paul@test.com", password }
    ]);
};
