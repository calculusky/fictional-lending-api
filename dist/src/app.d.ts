import express from 'express';
declare class App {
    app: express.Application;
    constructor();
    private initializeMiddlewares;
    listen(): void;
    getServer(): express.Application;
    private initializeRoutes;
    initializeSwagger(): void;
    initializeErrorHandling(): void;
}
export default App;
