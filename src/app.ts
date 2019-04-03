import express from 'express';
import { HelloController } from './controllers';

class Server {
    public app: express.Application;

    constructor() {
        this.app = express();

        this.app.use('/', HelloController);
    }
}

export default new Server().app;
