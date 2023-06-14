import Router from 'express';

import test from './test.js';
import users from './users.js';
import posts from './posts.js'
import rooms from './rooms.js'
import logger from '../utils/logger.js';

const router = Router();

// routes List
router.use('/test', test)
router.use('/users', users)
router.use('/posts', posts)
router.use('/rooms', rooms)

router.use('/', (req, res, next) => {
    try {
        res.status(404).json({
            message: "해당하는 페이지가 없습니다."
        })
    }catch(err) {
        next(err)
    }
})

// 에러처리  미들웨어
router.use((err, req, res, next) => {

    logger.error(err); // 에러 로깅

    // 클라이언트에게 적절한 에러 응답 전송
    res.status(500).json({
        message: "오류입니다."
    })
});

export default router;