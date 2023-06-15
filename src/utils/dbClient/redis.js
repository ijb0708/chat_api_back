import { createClient } from 'redis'
import logger from '../logger/index.js'

const config = {
    host: process.env.REDIS_DB_HOST,
    port: process.env.REDIS_DB_PORT,
    db: process.env.REDIS_DB_DATABASE,
    // password: process.env.REDIS_DB_PASSWORD
}

const redisClient = createClient(config)

redisClient.on('connect', () => {
    logger.info("[Redis] : 연결완료")
})

redisClient.on('error', err => {
    logger.error("[Redis] : 에러" + err)
})

redisClient.connect()

export default redisClient