import Router from 'express';
import logger from '../utils/logger.js';
import dbClient from '../utils/dbClient.js';

const router = Router();
const Chatlogs = () => dbClient('chatlogs')

router.get('/', async (req, res) => {
    logger.info("chatlog");
})

router.get('/view', async (req, res) => {

})

router.post('/insert', async (req, res) => {
    await Chatlogs()
        .insert({
            send_user_id: req.session.user_id,
            chatroom_id: req.session.chatroom_id,
            chat_cnt: req.query.content
        })
        .then(data => {

            res.status(200).send(true)
            return
        }).catch(err => {

            res.status(400).send(err)
            return
        })
})

export default router;