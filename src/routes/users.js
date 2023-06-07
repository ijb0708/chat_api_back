import Router from 'express';
import logger from '../utils/logger.js';
import dbClient from '../utils/dbClient.js';
import {hashPassword, verifyPassword} from '../globals/bcrypto.js'

const router = Router();
const Users = () => dbClient('users')

router.get('/', (req, res, next) => {
    logger.info("");
})

// root routes
router.post('/login', async (req, res, next) => {

    try {
        const userData = await Users()
            .select('user_passwd')
            .where('user_id', req.query.user_id)
    }catch(err) {
        next(err)
    }

    if(userData) {

        if( verifyPassword(req.query.user_passwd, userData.user_passwd) ) {

            req.session.user_id = data.user_id

            res.status(200).json({
                auth: true,
                message: "인증이 성공하였습니다."
            })
        }else {

            res.status(401).json({
                auth: false,
                message: "인증이 실패되었습니다."
            })
        }

    }else {

        res.status(200).json({
            auth: false,
            message: "없는 아이디입니다."
        });
    }

})

router.get('/userIdDupCheck', async (req, res, next) => {
    try {
        const userCount = await Users()
            .count('user_id')
            .where('user_id', req.query.user_id)
            .first()
    }catch(err) {
        next(err)
    }

    if(userCount > 0) {
        res.status(200).json({
            dupl: true,
            message: "중복된 아이디입니다."
        });
    }else {
        res.status(200).json({
            dupl: false,
            message: "중복된아이디가 아닙니다."
        })
    }
})                                                                                              

router.get('/register', async (req, res, next) => {

    try {
        await Users()
            .insert({
                user_id: req.query.user_id,
                user_name: req.query.user_name
            })

        res.status(201).json({
            isSucc: true,
            message: "회원가입에 성공했습니다."
        })
    }catch(err) {
        next(err)
    }

})

router.get('/info', async (req, res, next) => {
    
    try {
        const userInfo = await Users()
            .select('user_id', 'user_name')
            .where('user_id', req.query.user_id)
    }catch(err) {
        next(err)
    }

    if(userInfo) {
        res.status(200).json({
            data: userInfo,
            message: "유저정보가 검색되었습니다"
        })
    }else {
        res.status(200).json({
            message: "유저정보가 없습니다."
        })
    }
})

export default router;