import { ApolloServer } from 'apollo-server-express';
import express from 'express';
import { HelloController } from './controllers';

// tslint:disable-next-line: max-classes-per-file
class Server {
    public app: express.Application;

    constructor() {
        this.app = express();

        this.app.use('/', HelloController);
    }
}

export default new Server().app;
