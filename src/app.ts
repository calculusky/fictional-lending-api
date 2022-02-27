import { config } from 'dotenv';
config();
import express from 'express';
import helmet from 'helmet';
import compression from 'compression';
import cors from 'cors';
import fs from 'fs';
import { connection } from './config/config';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import errorMiddleware from './middlewares/error/error';
import path from 'path';



class App {
    public app: express.Application
    constructor() {
        this.app = express();

        // this.connectToDatabase()
        this.initializeMiddlewares();
        this.initializeRoutes();
        this.initializeSwagger();
        this.initializeErrorHandling();
    }

    //initialize middlewares
    private initializeMiddlewares() {
        this.app.use(cors());
        this.app.use(helmet());
        this.app.use(compression());
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));
    }

    public listen() {
        this.app.listen(connection.app.port, () => {
            console.log(`> Ready on ${connection.app.port}`);
        })
    }

    public getServer() {
        return this.app;
    }

    //register routes
    private initializeRoutes() {
        let routePath = `${__dirname}/routes`;
        fs.readdirSync(path.join(routePath)).forEach(dir => {
            if (fs.statSync(path.join(`${routePath}/${dir}`)).isDirectory()) {
                const filePath = `${routePath}/${dir}`;
                fs.readdirSync(path.join(filePath)).forEach(route => {
                    const theRoute = route.split('.')[0];
                    const ControllerRoute = require(path.join(`${filePath}/${theRoute}`));
                    const ctrlRoute = new ControllerRoute();
                    this.app.use('/api', ctrlRoute.router);
                })
            }
        })
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

        const specs = swaggerJSDoc(options);
        this.app.use('/api/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
    }

    //error handling
    initializeErrorHandling() {
        this.app.use(errorMiddleware);
    }
}



export default App;