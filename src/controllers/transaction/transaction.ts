import { Response, NextFunction } from 'express';
import { RequestWithUser } from '../../interfaces/auth';
import { FundPayload } from '../../interfaces/transaction';
import TransactionService from '../../services/transaction/transaction';
import { HttpException } from '../../exceptions/httpException';



class TransactionController {

    public transactionService = new TransactionService()

    public fundOwnAccount = async (req: RequestWithUser, res: Response, next: NextFunction) => {
        const user = req.user;
        const payload: FundPayload = req.body;
        try {

            if (!payload.amount) throw new HttpException(400, 'Amount is required');
            if (isNaN(payload.amount)) throw new HttpException(400, 'Wrong field for amount');
            const updatedBalance = await this.transactionService.fundOwnAccount({ userId: user.id, amount: +payload.amount });


            res.json({ success: true, data: updatedBalance })

        } catch (error) {
            next(error)
        }
    }

    public transferFund = async (req: RequestWithUser, res: Response, next: NextFunction) => {
        const user = req.user;
        const payload: FundPayload = req.body;
        try {
            if (!payload.amount) throw new HttpException(400, 'Amount is required');
            if (isNaN(payload.amount)) throw new HttpException(400, 'Wrong field for amount');
            if (!payload.receiverId) throw new HttpException(400, 'Receiver Id is required');
            if (isNaN(payload.receiverId)) throw new HttpException(400, 'Wrong field for receiver');
            if (payload.receiverId == user.id) throw new HttpException(400, 'Transfer is not valid on self account');

            const updatedBalance = await this.transactionService.transferFund({
                amount: +payload.amount,
                senderId: user.id,
                receiverId: +payload.receiverId
            });

            res.json({ success: true, data: updatedBalance })

        } catch (error) {
            next(error);
        }
    }

    public withdrawFund = async (req: RequestWithUser, res: Response, next: NextFunction) => {
        const user = req.user;
        const payload: FundPayload = req.body;

        try {
            if (!payload.amount) throw new HttpException(400, 'Amount is required');
            if (isNaN(payload.amount)) throw new HttpException(400, 'Wrong field for amount');

            const updatedBalance = await this.transactionService.withdrawFund({ userId: user.id, amount: +payload.amount });

            res.json({ success: true, data: updatedBalance })


        } catch (error) {
            next(error);
        }
    }

    public getTransactions = async (req: RequestWithUser, res: Response, next: NextFunction) => {
        const user = req.user;
        try {

            const data = await this.transactionService.getUserTransactions(user.id);

            res.json({ data })

        } catch (error) {
            next(error);
        }
    }

    public getBalance = async (req: RequestWithUser, res: Response, next: NextFunction) => {
        const user = req.user;
        try {
            const data = await this.transactionService.getUserBalance(user.id);

            res.json({ data })

        } catch (error) {
            next(error);
        }
    }


}

export default TransactionController