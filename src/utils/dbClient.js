import knex from 'knex';
import dotenv from 'dotenv'
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

export { postgreDB }