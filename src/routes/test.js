import Router from 'express';
import logger from '../utils/logger.js';

const router = Router();

router.get('/', (req, res) => {
    logger.info("dommy!!");
    res.status(200).send("testMain");
})

// root routes
router.get('/testData', (req, res) => {
    logger.info("dommy Danta");
    res.status(200).send("test");
});

router.get('/sessionTest', (req, res) => {
    if(req.session.test){
        res.send('세션이 이미 존재');
    }
    else {  
        req.session.test = "test string";
        logger.info(req.session.test);
        res.send('세션 생성');
    }
})


router.get('/call', (req, res) => {
    res.send('daisy bell');
})

router.get('/kill', (req, res) => {
    process.exit(1)
})

export default router;