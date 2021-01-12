import express, { Application, Router } from 'express';
import bodyParser from 'body-parser';
import postsRouter from './routers/PostsRouter';
import userRouter from './routers/UserRouter';
import pool from './dbconfig/dbconnector';

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
        this.app.use(bodyParser.urlencoded({ extended: true }));
        // this.app.use(bodyParser.json({ limit: '1mb' })); // 100kb default
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