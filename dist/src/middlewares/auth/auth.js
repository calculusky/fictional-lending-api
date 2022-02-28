"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const validator_1 = require("validator");
const httpException_1 = require("../../exceptions/httpException");
const helper_1 = require("../../utils/helper");
const bcrypt_1 = (0, tslib_1.__importDefault)(require("bcrypt"));
const jsonwebtoken_1 = (0, tslib_1.__importDefault)(require("jsonwebtoken"));
const config_1 = require("../../config/config");
const auth_1 = (0, tslib_1.__importDefault)(require("../../services/auth/auth"));
class AuthMiddleware {
    constructor() {
        this.authService = new auth_1.default();
        this.validateSignup = (req, res, next) => (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            const userData = req.body;
            try {
                //validating firstName
                if (!userData.firstName)
                    throw new httpException_1.HttpException(400, 'first name is required');
                if (!(0, validator_1.isAlpha)(userData.firstName))
                    throw new httpException_1.HttpException(400, 'first name must be letters');
                //validating lastName
                if (!userData.lastName)
                    throw new httpException_1.HttpException(400, 'last name is required');
                if (!(0, validator_1.isAlpha)(userData.lastName))
                    throw new httpException_1.HttpException(400, 'last name must be letters');
                //validating email
                if (!userData.email)
                    throw new httpException_1.HttpException(400, 'first name is required');
                if (!(0, validator_1.isEmail)(userData.email))
                    throw new httpException_1.HttpException(400, 'Invalid email address');
                //validating password
                if (!userData.password)
                    throw new httpException_1.HttpException(400, 'password is required');
                if (userData.password.length < 8 || !(0, validator_1.isAlphanumeric)(userData.password))
                    throw new httpException_1.HttpException(400, 'password must contain letters or numbers with minimum of 8 characters');
                const data = {
                    firstName: (0, helper_1.formatName)(userData.firstName.trim()),
                    lastName: (0, helper_1.formatName)(userData.lastName.trim()),
                    email: (0, validator_1.normalizeEmail)(userData.email),
                    password: bcrypt_1.default.hashSync(userData.password, 14)
                };
                req.user = data;
                return next();
            }
            catch (error) {
                next(error);
            }
        });
        //validate login input
        this.validateLogin = (req, res, next) => {
            const userInput = req.body;
            try {
                if (!userInput.email || !(0, validator_1.isEmail)(userInput.email))
                    throw new httpException_1.HttpException(400, 'Wrong email or password');
                if (!userInput.password || !(0, validator_1.isAlphanumeric)(userInput.password))
                    throw new httpException_1.HttpException(400, 'Wrong email or password');
                return next();
            }
            catch (error) {
                next(error);
            }
        };
        this.authenticateUser = (req, res, next) => (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            try {
                const Authorization = req.header('Authorization');
                if (!Authorization)
                    throw new httpException_1.HttpException(401, 'Unauthorized! Please login');
                const decoded = jsonwebtoken_1.default.verify(Authorization, config_1.secretKey.jwtSecret);
                if (!decoded)
                    throw new httpException_1.HttpException(400, 'Wrong authentication token');
                const userId = decoded.id;
                const user = yield this.authService.findUser({ id: userId });
                if (!user)
                    throw new httpException_1.HttpException(400, 'Wrong authentication token');
                req.user = user;
                return next();
            }
            catch (error) {
                next(new httpException_1.HttpException(401, 'Wrong authentication token'));
            }
        });
    }
}
exports.default = AuthMiddleware;
//# sourceMappingURL=auth.js.map