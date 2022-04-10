export {}
const Router = require('express');
const router = new Router();

const userRouter = require('./userRoutes');

router.use('/user', userRouter)


module.exports = router