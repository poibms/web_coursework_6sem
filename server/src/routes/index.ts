export {};
const Router = require('express');
const router = new Router();

const userRouter = require('./userRoutes');
const collectionRoutes = require('./collectionRoutes');
const tagsRoutes = require('./tagsRoutes');

router.use('/user', userRouter);
router.use('/collections', collectionRoutes);
router.use('/tags', tagsRoutes);

module.exports = router;
