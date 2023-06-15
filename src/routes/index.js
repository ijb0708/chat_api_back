import Router from 'express';

import test from './test.js';
import users from './users.js';
import posts from './posts.js'
import rooms from './rooms.js'
import logger from '../utils/logger/index.js';

import middleware from '../middleware/index.js';
const { error, notFound } = middleware

const router = Router();

// routes List
router.use('/test', test)
router.use('/users', users)
router.use('/posts', posts)
router.use('/rooms', rooms)

// not found
router.use('/', notFound)

// 에러처리  미들웨어
router.use('/', error);

export default router;