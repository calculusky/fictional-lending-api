export declare const connection: {
    app: {
        port: string | number;
    };
    db: {
        host: string;
        database: string;
        port: string;
        user: string;
        password: string;
    };
};
export declare const secretKey: {
    jwtSecret: string;
};
export declare const transCode: {
    type: {
        credit: string;
        debit: string;
    };
    actionType: {
        transfer: string;
        withdraw: string;
        selfFund: string;
        benefactorFund: string;
    };
};
