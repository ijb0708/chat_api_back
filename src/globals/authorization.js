import logger from "../utils/logger.js";
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv'

//NODE_ENV
dotenv.config({ path: '.env.local' });

const secretKey = process.env.TOKEN_SECRET
logger.info(secretKey)

export const genToken = data => {
  return jwt.sign(data, secretKey);
}

// 보호된 라우트에 대한 JWT 검증 미들웨어
export const authToken = (req, res, next) => {
  const authorizationHeader = req.headers.authorization
  if(authorizationHeader && authorizationHeader.startsWith('Bearer ')) {
    const token = authorizationHeader.substring(7)
    
    try {
      const decoded = jwt.verify(token, secretKey)

      console.log(decoded)
      req.token = decoded
      next()
    }catch(err) {
      next(err)
    }
  }
}

export const getTokenData = token => {

  try {
    const decodedToken = jwt.verify(token, secretKey);
    console.log(decodedToken)
    return decodedToken
  }catch (error) {
    throw new Error('유효하지 않은 토큰입니다.')
  } 
}


