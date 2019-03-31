import express from "express";
import { HelloController } from "./controllers";

export class Server {
    public static bootstrap(): Server {
        return new Server();
    }

    public app: express.Application;

    constructor() {
        this.app = express();

        this.app.use("/", HelloController);
    }
}
