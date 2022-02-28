"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const auth_1 = (0, tslib_1.__importDefault)(require("../../services/auth/auth"));
class AuthController {
    constructor() {
        this.authService = new auth_1.default();
        this.signup = (req, res, next) => (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            const userData = req.user;
            try {
                const createdUser = yield this.authService.createUser(userData);
                res.status(201).json({ data: createdUser });
            }
            catch (error) {
                next(error);
            }
        });
        this.login = (req, res, next) => (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            const userInput = req.body;
            try {
                const token = yield this.authService.loginUser(userInput);
                res.status(201).json({ success: true, token: token });
            }
            catch (error) {
                next(error);
            }
        });
    }
}
exports.default = AuthController;
//# sourceMappingURL=auth.js.map