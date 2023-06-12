import Router from 'express';
import logger from '../utils/logger.js';
import { authToken } from '../globals/authorization.js'
import jwt from 'jsonwebtoken';

const secretKey = "12341324"

const router = Router();

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
  
  // 보호된 라우트에 대한 JWT 검증 미들웨어
  function verifyToken(req, res, next) {
    // 헤더에서 토큰 가져오기
    const token = req.headers['authorization'];
  
    if (!token) {
      return res.status(401).json({ message: 'Access denied. No token provided.' });
    }
  
    // JWT 토큰 검증
    jwt.verify(token, secretKey, (err, decoded) => {
      if (err) {
        return res.status(401).json({ message: 'Invalid token.' });
      }
  
      // 토큰이 유효한 경우, 디코딩된 정보를 요청 객체에 추가
      req.user = decoded;
      next();
    });
  }
  
  // 보호된 라우트
  router.get('/protected', authToken, (req, res) => {
    res.json({ message: 'Protected route accessed successfully.', user: req.user });
  });
  
export default router;