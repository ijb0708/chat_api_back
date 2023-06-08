import knex from 'knex';
import dotenv from 'dotenv'
import redis from 'redis';
import logger from './logger.js';

//NODE_ENV
dotenv.config({ path: '.env.local' });

const postgreDB = knex({
    client: 'pg',
    connection:{
        user : process.env.POSTGRE_DB_USER,
        password : process.env.POSTGRE_DB_PASSWORD,
        database : process.env.POSTGRE_DB_DATABASE,
        host : process.env.POSTGRE_DB_HOST,
        port : process.env.POSTGRE_DB_PORT,
    },

    //connection pool 옵션
    pool: {
        //최소 풀 개수
        min: 0,
        //최대 풀 개수
        max: 10
    }
})

// Redis 클라이언트 생성 
const redisDB = redis.createClient({
    host: process.env.REDIS_DB_HOST, // Redis 호스트
    port: process.env.REDIS_DB_PORT // Redis 포트
});
  
// Redis 클라이언트 연결 이벤트 리스너
redisDB.on('connect', () => {
    logger.info("Redis 클라이언트가 연결되었습니다")
});

// Redis 클라이언트 오류 이벤트 리스너
redisDB.on('error', (err) => {
    logger.error('Redis 클라이언트 오류:', err);
});

// Redis 클라이언트 종료 이벤트 리스너
redisDB.on('end', () => {
    logger.info('Redis 클라이언트가 연결이 종료되었습니다.');
});

redisDB.connect().then()

export { postgreDB, redisDB }