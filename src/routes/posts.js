import Router from 'express';
import logger from '../utils/logger/index.js';
import { postgresClient } from '../utils/dbClient/index.js';
import middleware from '../middleware/index.js'

const { authToken } = middleware

const router = Router();

const Posts = () => postgresClient('posts')

router.get('/', async (req, res) => {
    logger.info("posts");
    next()
})

// 게시글 조회
router.get('/getPosts', async (req, res) => {
    const { pageNum, pageSize } = req.query

    const offset = (pageNum - 1) * pageSize
    try {
        const posts = await Posts()
            .select()
            .orderBy('created_at', 'desc')
            .limit(pageSize)
            .offset(offset)

        res.json({
            data: posts,
            message: "게시글이 조회되었습니다"
        });
    } catch (err) {
        next(err)
    }
});
  
// 게시글 등록
router.post('/register', authToken, async (req, res, next) => {
    const { title, content } = req.body
    // const { user_seq } = req.session.user

    try {
        const newPost = await Posts()
            .insert({
                title: title,
                content: content,
                create_user_seq: user_seq
            });
        
        res.status(201).json({
            isSucc: true,
            message: "게시글이 등록 되었습니다."
        });
    } catch (err) {
        next(err)
    }
});

export default router;