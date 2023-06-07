import Router from 'express';

import test from './test.js';
import users from './users.js';
import rooms from './rooms.js';
import chatlogs from './chatlogs.js';

const router = Router();

// routes List
router.use('/test', test);
// router.use('/users', users);
// router.use('/rooms', rooms);
router.use('/chatlogs', chatlogs);

// 에러처리  미들웨어
app.use((err, req, res, next) => {

    console.error(err); // 에러 로깅

    // 클라이언트에게 적절한 에러 응답 전송
    res.status(500).json({
        message: "오류입니다."
    })
});

export default router;