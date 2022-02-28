"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.seed = void 0;
const tslib_1 = require("tslib");
function seed(knex) {
    return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
        // Deletes ALL existing entries
        yield knex("users").del();
        // Inserts seed entries
        const password = '$2a$14$Ea7raIG1/atXQ3tqB24.0.vscp80vuv1/pGpStpShLyrWXMCnFI0e';
        yield knex("users").insert([
            { id: 1, firstName: "John", lastName: "Doe", email: "johndoe@test.com", password },
            { id: 2, firstName: "Wilson", lastName: "Smith", email: "wil_smith@test.com", password },
            { id: 3, firstName: "Messi", lastName: "Lionel", email: "messi@test.com", password },
            { id: 4, firstName: "Paul", lastName: "Scholes", email: "paul@test.com", password }
        ]);
    });
}
exports.seed = seed;
;
//# sourceMappingURL=01_users.js.map