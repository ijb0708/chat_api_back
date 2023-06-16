import redis from 'redis'
import logger from '../logger/index.js'

const config = {
    legacyMode: true, 
    db: process.env.REDIS_DATABASE,
    password: process.env.REDIS_PASSWORD,
    socket: {
        host: process.env.REDIS_HOST,
        port: process.env.REDIS_PORT,
    }
} 

const redisClient = redis.createClient(config);

redisClient.on('connect', () => {
    logger.info("[Redis] : 연결완료")
})

redisClient.on('error', err => {
    logger.error("[Redis] : 에러" + err)
})

redisClient.connect()

export default redisClient.v4