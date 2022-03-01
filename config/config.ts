

const { DB_HOST, DB_DATABASE, DB_PORT, DB_USER, DB_PASS, JWT_SECRET } = process.env;


//env variables
export const connection = {
    db: {
        host: DB_HOST,
        database: DB_DATABASE,
        port: DB_PORT,
        user: DB_USER,
        password: DB_PASS
    }
}

export const secretKey = {
    jwtSecret: JWT_SECRET
}

export const transCode = {
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
}