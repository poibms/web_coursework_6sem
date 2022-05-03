export {};
const tagsController = require('../controllers/tagsControllers');
const authMiddleware = require('../middleware/authMiddleware');
const collectionControllers = require('../controllers/collectionControllers');
const Router = require('express');
const router = new Router();

router.post('/', authMiddleware, tagsController.createTag);
router.get('/', tagsController.getAllTags);
router.get('/bytag', collectionControllers.getCollByTags);

module.exports = router;
