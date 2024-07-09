import express, { Router } from 'express';
import cors from 'cors';

interface Options {
    port: number;
    routes: Router;
}

export class Server {

    private app = express();
    private readonly port: number;
    private readonly routes: Router;

    constructor(options: Options) {
        const { port, routes } = options;
        this.port = port;
        this.routes = routes;
    }


    async start() {

        // Midlewares
        // Parsea la info que viene en el body y la transforma en objeto JSON:
        this.app.use( express.json() );
        // Permite el formato de data x-form-urlcoded
        this.app.use( express.urlencoded({ extended: true }) );
        // CORS:
        this.app.use( cors({
            origin: 'http://localhost:4200',
            methods: ['GET', 'PUT', 'POST', 'DELETE'],
            allowedHeaders: ['Content-Type'],
            credentials: true
        }) );

        // Routes
        this.app.use( this.routes );

        this.app.listen(this.port, () => {
            console.log(`Server running on port ${this.port}`);
        });

    }

}


