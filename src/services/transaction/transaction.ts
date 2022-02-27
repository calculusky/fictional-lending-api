import { transCode } from '../../config/config';
import knex from '../../database/knex';
import { HttpException } from '../../exceptions/httpException';
import { Transaction, User } from '../../interfaces/model';


class TransactionService {

    public fundOwnAccount = async (value: { userId: number, amount: number }) => {
        const userWallet = await this.findWallet({ userId: value.userId });
        if (!userWallet) throw new HttpException(404, 'Unable to retrieve user wallet');
        const newBalance = userWallet.balance + value.amount;
        const updatedWallet = await knex('wallets').where({ userId: value.userId }).update({ balance: newBalance, updatedAt: knex.fn.now() });
        if (!updatedWallet) throw new HttpException(501, 'Failed to credit account');
        const [balance] = await knex('wallets').where({ userId: value.userId }).select('balance');

        //create transaction record
        await knex<Transaction>('transactions').insert({
            userId: value.userId,
            amount: value.amount,
            type: transCode.type.credit,
            actionType: transCode.actionType.selfFund,
        })
        return balance;
    }

    public transferFund = async (value: { amount: number, senderId: number, receiverId: number }) => {
        //get the benefactor wallet and check for sufficient fund
        const senderWallet = await this.findWallet({ userId: value.senderId });
        if (!senderWallet) throw new HttpException(404, 'Unable to retrieve wallet');
        if (value.amount > senderWallet.balance) throw new HttpException(409, 'Insufficient fund! Please fund account');

        //transfer the fund
        //update receiver account
        const receiverWallet = await this.findWallet({ userId: value.receiverId });
        if (!receiverWallet) throw new HttpException(404, 'Receiver not found');
        const newReceiverBalance = receiverWallet.balance + value.amount;
        const updatedReceiverWallet = await knex('wallets').where({ userId: value.receiverId }).update({ balance: newReceiverBalance, updatedAt: knex.fn.now() });
        if (!updatedReceiverWallet) throw new HttpException(501, 'Failed to credit receiver account');

        //create transaction record for receiver
        await knex<Transaction>('transactions').insert({
            userId: value.receiverId,
            amount: value.amount,
            type: transCode.type.credit,
            actionType: transCode.actionType.benefactorFund,
            creditorId: value.senderId
        });

        //update sender account
        const newSenderBalance = senderWallet.balance - value.amount;
        const updatedSenderWallet = await knex('wallets').where({ userId: value.senderId }).update({ balance: newSenderBalance, updatedAt: knex.fn.now() });
        if (!updatedSenderWallet) throw new HttpException(501, 'Failed to debit account');

        //create transaction record for sender
        await knex<Transaction>('transactions').insert({
            userId: value.senderId,
            amount: value.amount,
            type: transCode.type.debit,
            actionType: transCode.actionType.transfer,
            receiverId: value.receiverId
        });

        //return the balance
        const [balance] = await knex('wallets').where({ userId: value.senderId }).select('balance');
        return balance
    }

    public withdrawFund = async (value: { userId: number, amount: number }) => {
        const userWallet = await this.findWallet({ userId: value.userId });
        if (!userWallet) throw new HttpException(501, 'Unable to withdraw fund');
        if (value.amount > userWallet.balance) throw new HttpException(409, 'Insufficient fund! Please fund account');
        const newBalance = userWallet.balance - value.amount;
        const updatedWallet = await knex('wallets').where({ userId: value.userId }).update({ balance: newBalance, updatedAt: knex.fn.now() });
        if (!updatedWallet) throw new HttpException(501, 'Failed to withdraw fund');
        const [balance] = await knex('wallets').where({ userId: value.userId }).select('balance');

        //create transaction record for withdrawal
        await knex<Transaction>('transactions').insert({
            userId: value.userId,
            amount: value.amount,
            type: transCode.type.debit,
            actionType: transCode.actionType.withdraw,
        });

        return balance;
    }

    public getUserTransactions = async (userId: number) => {
        //const transactions = await knex('transactions').where({ userId });
        const transfers = await knex('transactions').where({ userId, actionType: 'transfer' }).join('users', 'transactions.receiverId', 'users.id').select('transactions.id', 'transactions.amount', 'transactions.type', 'transactions.actionType', 'users.firstName', 'users.lastName', 'users.email', 'transactions.createdAt', 'transactions.updatedAt');
        const receivedFunds = await knex('transactions').where({ userId, actionType: 'benefactorFunded' }).join('users', 'transactions.creditorId', 'users.id').select('transactions.id', 'transactions.amount', 'transactions.type', 'transactions.actionType', 'users.firstName', 'users.lastName', 'users.email', 'transactions.createdAt', 'transactions.updatedAt');
        const selfFunded = await knex('transactions').where({ userId, actionType: 'selfFunded' }).select('amount', 'type', 'actionType', 'createdAt', 'updatedAt');
        const withdrawals = await knex('transactions').where({ userId, actionType: 'withdraw' }).select('amount', 'type', 'actionType', 'createdAt', 'updatedAt');
        return { transfers, receivedFunds, selfFunded, withdrawals }
    }


    public getUserBalance = async (userId: number) => {
        const userWallet = await this.findWallet({ userId });
        if (!userWallet) throw new HttpException(501, 'Unable to get balance');
        return userWallet;
    }



    public findWallet = async (where: { userId?: number, id?: number }) => {
        const [walletRow] = await knex('wallets').where(where).select('balance');
        return walletRow;
    }
}


export default TransactionService