import { Response, NextFunction } from 'express';
import { RequestWithUser } from '../../interfaces/auth';
import TransactionService from '../../services/transaction/transaction';
declare class TransactionController {
    transactionService: TransactionService;
    fundOwnAccount: (req: RequestWithUser, res: Response, next: NextFunction) => Promise<void>;
    transferFund: (req: RequestWithUser, res: Response, next: NextFunction) => Promise<void>;
    withdrawFund: (req: RequestWithUser, res: Response, next: NextFunction) => Promise<void>;
    getTransactions: (req: RequestWithUser, res: Response, next: NextFunction) => Promise<void>;
    getBalance: (req: RequestWithUser, res: Response, next: NextFunction) => Promise<void>;
}
export default TransactionController;
