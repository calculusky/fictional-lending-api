"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
const express_1 = (0, tslib_1.__importDefault)(require("express"));
const helmet_1 = (0, tslib_1.__importDefault)(require("helmet"));
const compression_1 = (0, tslib_1.__importDefault)(require("compression"));
const cors_1 = (0, tslib_1.__importDefault)(require("cors"));
const fs_1 = (0, tslib_1.__importDefault)(require("fs"));
const config_1 = require("./config/config");
const swagger_jsdoc_1 = (0, tslib_1.__importDefault)(require("swagger-jsdoc"));
const swagger_ui_express_1 = (0, tslib_1.__importDefault)(require("swagger-ui-express"));
const error_1 = (0, tslib_1.__importDefault)(require("./middlewares/error/error"));
const path_1 = (0, tslib_1.__importDefault)(require("path"));
class App {
    constructor() {
        this.app = (0, express_1.default)();
        // this.connectToDatabase()
        this.initializeMiddlewares();
        this.initializeRoutes();
        this.initializeSwagger();
        this.initializeErrorHandling();
    }
    //initialize middlewares
    initializeMiddlewares() {
        this.app.use((0, cors_1.default)());
        this.app.use((0, helmet_1.default)());
        this.app.use((0, compression_1.default)());
        this.app.use(express_1.default.json());
        this.app.use(express_1.default.urlencoded({ extended: true }));
    }
    listen() {
        this.app.listen(config_1.connection.app.port, () => {
            console.log(`> Ready on ${config_1.connection.app.port}`);
        });
    }
    getServer() {
        return this.app;
    }
    //register routes
    initializeRoutes() {
        let routePath = `${__dirname}/routes`;
        fs_1.default.readdirSync(path_1.default.join(routePath)).forEach(dir => {
            if (fs_1.default.statSync(path_1.default.join(`${routePath}/${dir}`)).isDirectory()) {
                const filePath = `${routePath}/${dir}`;
                fs_1.default.readdirSync(path_1.default.join(filePath)).forEach(route => {
                    const theRoute = route.split('.')[0];
                    const ControllerRoute = require(path_1.default.join(`${filePath}/${theRoute}`));
                    const ctrlRoute = new ControllerRoute();
                    this.app.use('/api', ctrlRoute.router);
                });
            }
        });
    }
    //initialize swagger
    initializeSwagger() {
        const options = {
            swaggerDefinition: {
                info: {
                    title: 'FICTIONAL LENDING SERVICE',
                    version: '2.0.0',
                    description: 'API Service for a fictional Wallet App',
                },
                // host: configs.connection.host,
                basePath: '/api',
                swagger: '2.0'
            },
            apis: ['swagger.yaml'],
        };
        const specs = (0, swagger_jsdoc_1.default)(options);
        this.app.use('/api/api-docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(specs));
    }
    //error handling
    initializeErrorHandling() {
        this.app.use(error_1.default);
    }
}
exports.default = App;
//# sourceMappingURL=app.js.map