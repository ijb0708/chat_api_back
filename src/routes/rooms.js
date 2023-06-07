import Router from 'express';
import logger from '../utils/logger.js';
import dbClient from '../utils/dbClient.js';

const router = Router();

const Rooms = () => dbClient('chatrooms')

router.get('/', async (req, res) => {
    logger.info("rooms");
})

// root routes
router.get('/info/:room_id', async (req, res) => {
    await Rooms()
        .select()
        .where('room_id', req.params.room_id)
        .then(data => {

            res.status(200).send(data)

            return
        }).catch(err => {

            res.status(400).send(err)
            return
        })
})

router.get('/in/:room_id', async (req, res) => {

    //엑세스 권한 확인후 진입가능 로직 추가 필요 (현재는 미추가)

    await Rooms()
        .select()
        .where('room_id', req.params.room_id)
        .then(data => {

            req.session.room_id = req.params.room_id
            return
        }).catch(err => {

            res.status(400).send(err)
            return
        })
})

router.get('/out', async (req, res) => {

    req.session.room_id = ''
    return
})

router.get('/insert/:room_name', async (req, res) => {

    logger.info(req.params.room_name)

    await Rooms()
        .insert({
            chatroom_name: req.params.room_name
        })
        .returning('chatroom_id')
        .then(data => {

            req.session.room_id = data[0].chatroom_id

            res.status(200).send(true)
            return
        }).catch(err => {

            res.status(400).send(err)
            return
        })
})

export default router;