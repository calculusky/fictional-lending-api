"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const errorMiddleware = (error, req, res, next) => {
    try {
        if (error instanceof SyntaxError) {
            return res.status(400).json({
                message: 'Invalid body payload format',
            });
        }
        if (!error.status) {
            error.message = 'Internal server error';
            error.status = 500;
        }
        console.log(error, '*****');
        const status = error.status;
        const message = error.message;
        return res.status(status).json({ errors: { status, message } });
    }
    catch (error) {
        next(error);
    }
};
exports.default = errorMiddleware;
//# sourceMappingURL=error.js.map