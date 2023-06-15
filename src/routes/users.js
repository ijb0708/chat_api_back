import Router from 'express';
import logger from '../utils/logger/index.js';
import { postgresClient } from '../utils/dbClient/index.js';
import global from '../global/index.js'
import middleware from '../middleware/index.js';

const { authToken } = middleware

const router = Router();
const Users = () => postgresClient('users')

router.get('/', (req, res, next) => {
    try{
        logger.info("user info")
    }catch(err) {
        next(err)
    }
})

// 유저 로그인
router.post('/login', async (req, res, next) => {

    const { user_id, user_password } = req.body

    try {
        const userData = await Users()
            .select()
            .where('user_id', user_id)
            .first()
        
        if(userData) {

            if( await global.verifyPassword(user_password, userData.user_password) ) {

                const user = {
                    isLogin: true,
                    user_seq: userData.user_seq,
                    user_id: userData.user_id,
                    user_name: userData.user_name,
                }
    
                const token = global.genToken(user);

                res.status(200).json({
                    token: token,
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

    }catch(err) {
        next(err)
    }
})

// router.get('/logout', async (req, res, next) => {
//     try{
//         // delete req.session.user

//         res.status(200).json({
//             isSucc: true,
//             message: "로그아웃이 되었습니다."
//         });
//     }catch(err) {
//         next(err)
//     }
// })

// 유저 중복체크
router.get('/userIdDupCheck', async (req, res, next) => {

    const { user_id } = req.query

    try {
        const existingUser = await Users()
            .where('user_id', user_id)
            .first()
        
        if(existingUser) {
            res.status(409).json({
                dupl: true,
                message: "중복된 아이디입니다."
            });
        }else {
            res.status(200).json({
                dupl: false,
                message: "중복된아이디가 아닙니다."
            })
        }

    }catch(err) {
        next(err)
    }

})                                                                                              

// 회원가입
router.post('/register', async (req, res, next) => {

    const { user_id, user_name, user_password } = req.body

    const hashpassword = await global.hashPassword(user_password)

    try {
        await Users()
            .insert({
                user_id: user_id,
                user_name: user_name,
                user_password: hashpassword
            })

        res.status(201).json({
            isSucc: true,
            message: "회원가입에 성공했습니다."
        })
    }catch(err) {
        next(err)
    }
})

router.get('/info', authToken, (req, res, next) => {

    console.log(req.token)
    const { user_id, user_seq, isLogin } = req.token

    try{
        res.status(200).json({
            data: {
                isLogin: true,
                user_id: user_id
            },
            message: "로그인정보가 조회되었습니다."
        })
    }catch(err) {
        next(err)
    }

})

// 유저 정보 조회
router.get('/search', async (req, res, next) => {
    
    const { user_id } = req.query

    try {
        const userInfo = await Users()
            .select('user_id', 'user_name')
            .where('user_id', user_id)

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
    }catch(err) {
        next(err)
    }
})

export default router;