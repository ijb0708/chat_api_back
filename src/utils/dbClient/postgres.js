import knex from 'knex';
import logger from '../logger/index.js';

const config = {
    user : process.env.POSTGRE_USER,
    password : process.env.POSTGRE_PASSWORD,
    database : process.env.POSTGRE_DATABASE,
    host : process.env.POSTGRE_HOST,
    port : process.env.POSTGRE_PORT,
}

const postgresClient = knex({
    client: 'pg',
    connection: config,

    //connection pool 옵션
    pool: {
        //최소 풀 개수
        min: 0,
        //최대 풀 개수
        max: 10
    }
})

postgresClient.raw('SELECT 1')
    .then(() => {
        logger.info("[Postgres] : 연결완료")
    })
    .catch((err) => {
        logger.info("[Postgres] : 에러" + err)
    })

export default postgresClient