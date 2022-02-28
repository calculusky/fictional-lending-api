"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.seed = void 0;
const tslib_1 = require("tslib");
function seed(knex) {
    return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
        // Deletes ALL existing entries
        yield knex("transactions").del();
        // Inserts seed entries
        yield knex("transactions").insert([
            { id: 1, userId: 1, amount: 2350, type: "credit", actionType: "self_funded", creditorId: null, receiverId: null },
            { id: 2, userId: 2, amount: 2500, type: "debit", actionType: "transfer", creditorId: null, receiverId: 4 },
            { id: 3, userId: 3, amount: 1000, type: "debit", actionType: "withdraw", creditorId: null, receiverId: null },
            { id: 4, userId: 4, amount: 2500, type: "credit", actionType: "benefactor_funded", creditorId: 2, receiverId: null },
        ]);
    });
}
exports.seed = seed;
;
//# sourceMappingURL=03_transactions.js.map