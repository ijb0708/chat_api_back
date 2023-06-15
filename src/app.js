import express from 'express';
// modules
import bodyParser from 'body-parser';
import path from 'path';
// import RedisStore from 'connect-redis';

// 설정파일
import routes from './routes/index.js';

const __dirname = path.resolve();

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// public 디렉토리를 정적 파일 경로로 설정
app.use('/page', express.static(path.join(__dirname, 'public')));

app.use('/', routes);

export default app;