import { Application } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import mongoose from 'mongoose';
import {DATABASE_URL} from "./constants";
import {Controller} from "./controller/subscriber";
import {PokeService} from "./service/pokemon.service";
class App {
    public app: Application;
    public pokeController: Controller;

    constructor() {
        this.app = express();
        this._setConfig();
        this._setMongoConfig();

        this.pokeController = new Controller(this.app, new PokeService());
    }

    private _setConfig() {
        this.app.use(bodyParser.json({ limit: '50mb' }));
        this.app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
        this.app.use(cors());
        this.app.use(express.json())

    }

    private _setMongoConfig() {
        mongoose.Promise = global.Promise;
        mongoose.connect(DATABASE_URL, { useNewUrlParser: true })

    }
}

export default new App().app;
