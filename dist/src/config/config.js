"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.transCode = exports.secretKey = exports.connection = void 0;
const { DB_HOST, DB_DATABASE, DB_PORT, DB_USER, DB_PASS, APP_PORT, JWT_SECRET } = process.env;
//env variables
exports.connection = {
    app: {
        port: APP_PORT || 6500
    },
    db: {
        host: DB_HOST,
        database: DB_DATABASE,
        port: DB_PORT,
        user: DB_USER,
        password: DB_PASS
    }
};
exports.secretKey = {
    jwtSecret: JWT_SECRET
};
exports.transCode = {
    type: {
        credit: "credit",
        debit: "debit"
    },
    actionType: {
        transfer: "transfer",
        withdraw: "withdraw",
        selfFund: "selfFunded",
        benefactorFund: "benefactorFunded"
    }
};
//# sourceMappingURL=config.js.map