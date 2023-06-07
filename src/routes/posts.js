import Router from 'express';
import logger from '../utils/logger.js';
import dbClient from '../utils/dbClient.js';
import checkAuth from '../globals/authorization.js'

const router = Router();

const Posts = () => dbClient('posts')

router.get('/', async (req, res) => {
    logger.info("posts");
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
router.post('/regiPost', checkAuth, async (req, res) => {
    const { title, content } = req.body

    try {
        const newPost = await Posts()
            .insert({
                title: title,
                content: content,
                user_id: req.session.user_id
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