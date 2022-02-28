"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.seed = void 0;
const tslib_1 = require("tslib");
function seed(knex) {
    return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
        // Deletes ALL existing entries
        yield knex("wallets").del();
        // Inserts seed entries
        yield knex("wallets").insert([
            { id: 1, balance: 5000, userId: 1 },
            { id: 2, balance: 3500, userId: 2 },
            { id: 3, balance: 7800, userId: 3 }
        ]);
    });
}
exports.seed = seed;
;
//# sourceMappingURL=02_wallets.js.map