import express from 'express';
// modules
import bodyParser from 'body-parser';
import path from 'path';
// 설정파일
import routes from './routes/index.js';
import session from 'express-session';

const __dirname = path.resolve();

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(
    session({
        secret: 'zero',
        resave: false,
        saveUninitialized: true,
        cookie: {
            secure: false
        }
    })
)

app.use('/', routes);

// 에러처리  미들웨어
app.use((err, req, res, next) => {

    console.error(err); // 에러 로깅

    // 클라이언트에게 적절한 에러 응답 전송
    res.status(500).json({
        err: err,
        message: "오류입니다."
    })
});
  

export default app;