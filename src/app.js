import express from 'express';
// modules
import bodyParser from 'body-parser';
import path from 'path';
import RedisStore from 'connect-redis';
import dotenv from 'dotenv'

// 설정파일
import routes from './routes/index.js';
import session from 'express-session';
import { redisDB as dbClient } from './utils/dbClient.js';

//NODE_ENV
dotenv.config({ path: '.env.local' });

const __dirname = path.resolve();

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: true,
        cookie: {
            secure: false
        },
        store: new RedisStore({
            client: dbClient 
        })
    })
)

app.use('/', routes);

export default app;