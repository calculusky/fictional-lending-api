"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const transaction_1 = (0, tslib_1.__importDefault)(require("../../services/transaction/transaction"));
const httpException_1 = require("../../exceptions/httpException");
class TransactionController {
    constructor() {
        this.transactionService = new transaction_1.default();
        this.fundOwnAccount = (req, res, next) => (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            const user = req.user;
            const payload = req.body;
            try {
                if (!payload.amount)
                    throw new httpException_1.HttpException(400, 'Amount is required');
                if (isNaN(payload.amount))
                    throw new httpException_1.HttpException(400, 'Wrong field for amount');
                const updatedBalance = yield this.transactionService.fundOwnAccount({ userId: user.id, amount: +payload.amount });
                res.json({ success: true, data: updatedBalance });
            }
            catch (error) {
                next(error);
            }
        });
        this.transferFund = (req, res, next) => (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            const user = req.user;
            const payload = req.body;
            try {
                if (!payload.amount)
                    throw new httpException_1.HttpException(400, 'Amount is required');
                if (isNaN(payload.amount))
                    throw new httpException_1.HttpException(400, 'Wrong field for amount');
                if (!payload.receiverId)
                    throw new httpException_1.HttpException(400, 'Receiver Id is required');
                if (isNaN(payload.receiverId))
                    throw new httpException_1.HttpException(400, 'Wrong field for receiver');
                if (payload.receiverId == user.id)
                    throw new httpException_1.HttpException(400, 'Transfer is not valid on self account');
                const updatedBalance = yield this.transactionService.transferFund({
                    amount: +payload.amount,
                    senderId: user.id,
                    receiverId: +payload.receiverId
                });
                res.json({ success: true, data: updatedBalance });
            }
            catch (error) {
                next(error);
            }
        });
        this.withdrawFund = (req, res, next) => (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            const user = req.user;
            const payload = req.body;
            try {
                if (!payload.amount)
                    throw new httpException_1.HttpException(400, 'Amount is required');
                if (isNaN(payload.amount))
                    throw new httpException_1.HttpException(400, 'Wrong field for amount');
                const updatedBalance = yield this.transactionService.withdrawFund({ userId: user.id, amount: +payload.amount });
                res.json({ success: true, data: updatedBalance });
            }
            catch (error) {
                next(error);
            }
        });
        this.getTransactions = (req, res, next) => (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            const user = req.user;
            try {
                const data = yield this.transactionService.getUserTransactions(user.id);
                res.json({ data });
            }
            catch (error) {
                next(error);
            }
        });
        this.getBalance = (req, res, next) => (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            const user = req.user;
            try {
                const data = yield this.transactionService.getUserBalance(user.id);
                res.json({ data });
            }
            catch (error) {
                next(error);
            }
        });
    }
}
exports.default = TransactionController;
//# sourceMappingURL=transaction.js.map