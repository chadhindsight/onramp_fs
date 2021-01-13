import express, { Application, Router } from 'express';
import bodyParser from 'body-parser';
import postsRouter from './routers/PostsRouter';
import userRouter from './routers/UserRouter';
import pool from './dbconfig/dbconnector';
import cors from 'cors';

class Server {
    private app;

    constructor() {
        this.app = express();
        this.config();
        // this.routerConfig();
        this.dbConnect();
    }

    private config() {
        this.app.use(express.json())
        // this takes care of any cors that pop up locally
        this.app.use(
            cors({
                credentials: true,
                origin: ["http://localhost:3000", "https://thawing-peak-97282.herokuapp.com"]
            })
        );
        this.app.use(bodyParser.urlencoded({ extended: true }));
    }

    private dbConnect() {
        pool.connect(function (err, client, done) {
            if (err) throw new Error(err);
            console.log('Connected');
        });
    }


    public start = (port: number) => {
        this.app.use('/posts', postsRouter);
        this.app.use('/users', userRouter);

        return new Promise((resolve, reject) => {
            this.app.listen(port, () => {
                resolve(port);
            }).on('error', (err: Object) => reject(err));
        });
    }
}

export default Server;