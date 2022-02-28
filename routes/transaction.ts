import { Router } from 'express';
import TransactionController from '../controllers/transaction'
import AuthMiddleware from '../middlewares/auth';


class TransactionRoute {
    public transactionController = new TransactionController();
    public authMiddleware = new AuthMiddleware();
    router = Router();

    constructor() {
        this.initializeRoute();
    }

    private initializeRoute() {
        this.router.post('/transaction/fund-own-account', this.authMiddleware.authenticateUser, this.transactionController.fundOwnAccount);
        this.router.post('/transaction/transfer-fund', this.authMiddleware.authenticateUser, this.transactionController.transferFund);
        this.router.post('/transaction/withdraw-fund', this.authMiddleware.authenticateUser, this.transactionController.withdrawFund);
        this.router.get('/transaction/user-transactions', this.authMiddleware.authenticateUser, this.transactionController.getTransactions);
        this.router.get('/transaction/user-balance', this.authMiddleware.authenticateUser, this.transactionController.getBalance);

    }
}


module.exports = TransactionRoute;