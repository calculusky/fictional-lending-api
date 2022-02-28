"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const express_1 = require("express");
const transaction_1 = (0, tslib_1.__importDefault)(require("../../controllers/transaction/transaction"));
const auth_1 = (0, tslib_1.__importDefault)(require("../../middlewares/auth/auth"));
class TransactionRoute {
    constructor() {
        this.transactionController = new transaction_1.default();
        this.authMiddleware = new auth_1.default();
        this.router = (0, express_1.Router)();
        this.initializeRoute();
    }
    initializeRoute() {
        this.router.post('/transaction/fund-own-account', this.authMiddleware.authenticateUser, this.transactionController.fundOwnAccount);
        this.router.post('/transaction/transfer-fund', this.authMiddleware.authenticateUser, this.transactionController.transferFund);
        this.router.post('/transaction/withdraw-fund', this.authMiddleware.authenticateUser, this.transactionController.withdrawFund);
        this.router.get('/transaction/user-transactions', this.authMiddleware.authenticateUser, this.transactionController.getTransactions);
        this.router.get('/transaction/user-balance', this.authMiddleware.authenticateUser, this.transactionController.getBalance);
    }
}
module.exports = TransactionRoute;
//# sourceMappingURL=transaction.js.map