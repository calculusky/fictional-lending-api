"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const bcrypt_1 = (0, tslib_1.__importDefault)(require("bcrypt"));
const knex_1 = (0, tslib_1.__importDefault)(require("../../database/knex"));
const httpException_1 = require("../../exceptions/httpException");
const jsonwebtoken_1 = (0, tslib_1.__importDefault)(require("jsonwebtoken"));
const config_1 = require("../../config/config");
class AuthService {
    constructor() {
        //signup
        this.createUser = (userData) => (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            const user = yield this.findUser({ email: userData.email });
            if (user)
                throw new httpException_1.HttpException(409, 'Account already exists');
            const [userId] = yield (0, knex_1.default)('users').insert(userData);
            if (!userId)
                throw new httpException_1.HttpException(501, 'Failed to create user');
            //create user wallet
            yield (0, knex_1.default)('wallets').insert({ userId });
            return yield this.findUser({ id: userId });
        });
        //login
        this.loginUser = (userInput) => (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            const user = yield this.findUser({ email: userInput.email }, true);
            if (!user)
                throw new httpException_1.HttpException(409, 'Wrong email or password');
            const isPasswordMatching = yield bcrypt_1.default.compare(userInput.password, user.password);
            if (!isPasswordMatching)
                throw new httpException_1.HttpException(409, "Wrong email or password");
            return this.createToken(user);
        });
        this.findUser = (where, includePassword = false) => (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            if (includePassword) {
                const [userRow] = yield (0, knex_1.default)('users').where(where);
                return userRow;
            }
            const [userRow] = yield (0, knex_1.default)('users').where(where).select('id', 'firstName', 'lastName', 'email', 'createdAt', 'updatedAt');
            return userRow;
        });
        this.createToken = (user) => {
            const dataStoredInToken = { id: user.id, email: user.email };
            const expiresIn = 60 * 60 * 24;
            return jsonwebtoken_1.default.sign(dataStoredInToken, config_1.secretKey.jwtSecret, { expiresIn });
        };
    }
}
exports.default = AuthService;
//# sourceMappingURL=auth.js.map