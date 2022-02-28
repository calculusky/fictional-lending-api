declare class TransactionService {
    fundOwnAccount: (value: {
        userId: number;
        amount: number;
    }) => Promise<any>;
    transferFund: (value: {
        amount: number;
        senderId: number;
        receiverId: number;
    }) => Promise<any>;
    withdrawFund: (value: {
        userId: number;
        amount: number;
    }) => Promise<any>;
    getUserTransactions: (userId: number) => Promise<{
        transfers: any[];
        receivedFunds: any[];
        selfFunded: any[];
        withdrawals: any[];
    }>;
    getUserBalance: (userId: number) => Promise<any>;
    findWallet: (where: {
        userId?: number;
        id?: number;
    }) => Promise<any>;
}
export default TransactionService;
