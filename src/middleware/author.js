import jwt from 'jsonwebtoken';

const secretKey = process.env.TOKEN_SECRET

// 보호된 라우트에 대한 JWT 검증 미들웨어
export const authToken = (req, res, next) => {

    const authorizationHeader = req.headers.authorization
    if(authorizationHeader && authorizationHeader.startsWith('Bearer ')) {
        const token = authorizationHeader.substring(7)
        
        try {
            const decoded = jwt.verify(token, secretKey)

            req.token = decoded
            next()
        }catch(err) {
            next(err)
        }
    }
}