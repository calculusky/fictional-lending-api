"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const express_1 = require("express");
const auth_1 = (0, tslib_1.__importDefault)(require("../../controllers/auth/auth"));
const auth_2 = (0, tslib_1.__importDefault)(require("../../middlewares/auth/auth"));
class AuthRoute {
    constructor() {
        this.authController = new auth_1.default();
        this.authMiddleware = new auth_2.default();
        this.router = (0, express_1.Router)();
        this.initializeRoute();
    }
    initializeRoute() {
        this.router.post('/auth/signup', this.authMiddleware.validateSignup, this.authController.signup);
        this.router.post('/auth/login', this.authMiddleware.validateLogin, this.authController.login);
    }
}
module.exports = AuthRoute;
//# sourceMappingURL=auth.js.map