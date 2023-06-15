import Router from 'express';
import logger from '../utils/logger/index.js';
import middleware from '../middleware/index.js'
import { postgresClient } from '../utils/dbClient/index.js';

const { authToken } = middleware

const secretKey = "12341324"

const router = Router();

const Rooms = () => postgresClient('rooms')

router.get('/', (req, res) => {
  logger.info("dommy!!");
  return res.status(200).send("testMain");
})

// root routes
router.get('/testData', (req, res) => {
  logger.info("dommy Danta");
  return res.status(200).send("test");
});

router.get('/sessionTest', (req, res) => {
  if(req.session.test){
      return res.send('세션이 이미 존재');
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

// 사용자 로그인 시 JWT 토큰 발급
router.post('/login', (req, res) => {
  // 사용자 인증 로직 수행
  const user = {
    id: 1,
    username: 'example_user'
  };

  // JWT 토큰 생성
  const token = jwt.sign(user, secretKey);

  res.json({ token });
});
  
// 보호된 라우트
router.get('/protected', authToken, (req, res) => {
  res.json({ message: 'Protected route accessed successfully.', user: req.user });
});

router.get('/getData', async (req, res, next) => {
  try{
    const roomData = await Rooms()
        .select()
        .where('room_seq', 17)
        .first()

    console.log(roomData)
    
    logger.info("delete")
    res.status(200).json(roomData)
  }catch(err) {
      next(err)
  }
});

export default router;