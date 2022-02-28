"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const config_1 = require("../../config/config");
const knex_1 = (0, tslib_1.__importDefault)(require("../../database/knex"));
const httpException_1 = require("../../exceptions/httpException");
class TransactionService {
    constructor() {
        this.fundOwnAccount = (value) => (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            const userWallet = yield this.findWallet({ userId: value.userId });
            if (!userWallet)
                throw new httpException_1.HttpException(404, 'Unable to retrieve user wallet');
            const newBalance = userWallet.balance + value.amount;
            const updatedWallet = yield (0, knex_1.default)('wallets').where({ userId: value.userId }).update({ balance: newBalance, updatedAt: knex_1.default.fn.now() });
            if (!updatedWallet)
                throw new httpException_1.HttpException(501, 'Failed to credit account');
            const [balance] = yield (0, knex_1.default)('wallets').where({ userId: value.userId }).select('balance');
            //create transaction record
            yield (0, knex_1.default)('transactions').insert({
                userId: value.userId,
                amount: value.amount,
                type: config_1.transCode.type.credit,
                actionType: config_1.transCode.actionType.selfFund,
            });
            return balance;
        });
        this.transferFund = (value) => (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            //get the benefactor wallet and check for sufficient fund
            const senderWallet = yield this.findWallet({ userId: value.senderId });
            if (!senderWallet)
                throw new httpException_1.HttpException(404, 'Unable to retrieve wallet');
            if (value.amount > senderWallet.balance)
                throw new httpException_1.HttpException(409, 'Insufficient fund! Please fund account');
            //transfer the fund
            //update receiver account
            const receiverWallet = yield this.findWallet({ userId: value.receiverId });
            if (!receiverWallet)
                throw new httpException_1.HttpException(404, 'Receiver not found');
            const newReceiverBalance = receiverWallet.balance + value.amount;
            const updatedReceiverWallet = yield (0, knex_1.default)('wallets').where({ userId: value.receiverId }).update({ balance: newReceiverBalance, updatedAt: knex_1.default.fn.now() });
            if (!updatedReceiverWallet)
                throw new httpException_1.HttpException(501, 'Failed to credit receiver account');
            //create transaction record for receiver
            yield (0, knex_1.default)('transactions').insert({
                userId: value.receiverId,
                amount: value.amount,
                type: config_1.transCode.type.credit,
                actionType: config_1.transCode.actionType.benefactorFund,
                creditorId: value.senderId
            });
            //update sender account
            const newSenderBalance = senderWallet.balance - value.amount;
            const updatedSenderWallet = yield (0, knex_1.default)('wallets').where({ userId: value.senderId }).update({ balance: newSenderBalance, updatedAt: knex_1.default.fn.now() });
            if (!updatedSenderWallet)
                throw new httpException_1.HttpException(501, 'Failed to debit account');
            //create transaction record for sender
            yield (0, knex_1.default)('transactions').insert({
                userId: value.senderId,
                amount: value.amount,
                type: config_1.transCode.type.debit,
                actionType: config_1.transCode.actionType.transfer,
                receiverId: value.receiverId
            });
            //return the balance
            const [balance] = yield (0, knex_1.default)('wallets').where({ userId: value.senderId }).select('balance');
            return balance;
        });
        this.withdrawFund = (value) => (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            const userWallet = yield this.findWallet({ userId: value.userId });
            if (!userWallet)
                throw new httpException_1.HttpException(501, 'Unable to withdraw fund');
            if (value.amount > userWallet.balance)
                throw new httpException_1.HttpException(409, 'Insufficient fund! Please fund account');
            const newBalance = userWallet.balance - value.amount;
            const updatedWallet = yield (0, knex_1.default)('wallets').where({ userId: value.userId }).update({ balance: newBalance, updatedAt: knex_1.default.fn.now() });
            if (!updatedWallet)
                throw new httpException_1.HttpException(501, 'Failed to withdraw fund');
            const [balance] = yield (0, knex_1.default)('wallets').where({ userId: value.userId }).select('balance');
            //create transaction record for withdrawal
            yield (0, knex_1.default)('transactions').insert({
                userId: value.userId,
                amount: value.amount,
                type: config_1.transCode.type.debit,
                actionType: config_1.transCode.actionType.withdraw,
            });
            return balance;
        });
        this.getUserTransactions = (userId) => (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            //const transactions = await knex('transactions').where({ userId });
            const transfers = yield (0, knex_1.default)('transactions').where({ userId, actionType: 'transfer' }).join('users', 'transactions.receiverId', 'users.id').select('transactions.id', 'transactions.amount', 'transactions.type', 'transactions.actionType', 'users.firstName', 'users.lastName', 'users.email', 'transactions.createdAt', 'transactions.updatedAt');
            const receivedFunds = yield (0, knex_1.default)('transactions').where({ userId, actionType: 'benefactorFunded' }).join('users', 'transactions.creditorId', 'users.id').select('transactions.id', 'transactions.amount', 'transactions.type', 'transactions.actionType', 'users.firstName', 'users.lastName', 'users.email', 'transactions.createdAt', 'transactions.updatedAt');
            const selfFunded = yield (0, knex_1.default)('transactions').where({ userId, actionType: 'selfFunded' }).select('amount', 'type', 'actionType', 'createdAt', 'updatedAt');
            const withdrawals = yield (0, knex_1.default)('transactions').where({ userId, actionType: 'withdraw' }).select('amount', 'type', 'actionType', 'createdAt', 'updatedAt');
            return { transfers, receivedFunds, selfFunded, withdrawals };
        });
        this.getUserBalance = (userId) => (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            const userWallet = yield this.findWallet({ userId });
            if (!userWallet)
                throw new httpException_1.HttpException(501, 'Unable to get balance');
            return userWallet;
        });
        this.findWallet = (where) => (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            const [walletRow] = yield (0, knex_1.default)('wallets').where(where).select('balance');
            return walletRow;
        });
    }
}
exports.default = TransactionService;
//# sourceMappingURL=transaction.js.map