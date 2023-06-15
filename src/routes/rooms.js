import Router from 'express';
import logger from '../utils/logger/index.js';
import { postgresClient } from '../utils/dbClient/index.js';
import global from '../global/index.js'
import middleware from '../middleware/index.js';

const { authToken } = middleware

const router = Router();

const Rooms = () => postgresClient('rooms')

router.get('/', async (req, res, next) => {
    logger.info("rooms");
    next()
})
  
router.post('/register', authToken, async (req, res, next) => {
    const { user_seq } = req.token
    const { room_name } = req.body

    try {
        await Rooms()
            .insert({
                room_name: room_name,
                admin_user_seq: user_seq
            });
        
        res.status(201).json({
            isSucc: true,
            message: "방이 생성되었습니다."
        });
    } catch (err) {
        next(err)
    }
});

router.get('/listRooms', async (req, res, next) => {
    const { pageNum, pageSize } = req.query

    logger.info(pageNum)
    logger.info(pageSize)
    const offset = (pageNum - 1) * pageSize
    try{
        const rooms = await Rooms()    
            .select()
            .orderBy('created_at', 'desc')
            .limit(pageSize)
            .offset(offset)

        const returnTotal = await Rooms()
            .count()
            .first()
        console.log(returnTotal.count)

        res.status(200).json({
            data: {
                rooms: rooms,
                total: returnTotal.count
            },
            message: "방정보가 조회 되었습니다."
        })
    }catch(err) {
        next(err)
    }
})

router.post('/enterRoom', authToken, async(req, res, next) => {
    const { room_seq } = req.body
    const { user_id, user_name } = req.token

    try{
        const roomData = await Rooms()
            .select()
            .where('room_seq', room_seq)
            .first()
        
        if(roomData) {

            res.status(200).json({
                isSucc: true,
                room_access_token: global.genToken({
                    isSucc: true,
                    room_seq: room_seq,
                    user_id: user_id,
                    user_name: user_name
                }),
                message: "방에 들어갔습니다."
            })
        }else {
            res.status(200).json({
                isSucc: false,
                message: "해당하는 방이 없습니다."
            })
        }
    }catch(err) {
        next(err)
    }
    
})

router.post('/deleteRoom', authToken, async(req, res, next) => {
    const { room_seq } = req.body
    const { user_seq } = req.token

    try{
        const roomData = await Rooms()
            .select()
            .where('room_seq', room_seq)
            .first()

        console.log(roomData)
        
        logger.info("delete")
    }catch(err) {
        next(err)
    }
    
})

export default router;