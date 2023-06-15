import logger from "../utils/logger/index.js";
import jwt from 'jsonwebtoken';

const secretKey = process.env.TOKEN_SECRET

export const genToken = data => {
  return jwt.sign(data, secretKey);
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


