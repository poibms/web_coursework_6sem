export {};
const tagsController = require('../controllers/tagsControllers');
const authMiddleware = require('../middleware/authMiddleware');
const Router = require('express');
const router = new Router();

router.post('/', authMiddleware, tagsController.createTag);
router.get('/', tagsController.getAllTags);

module.exports = router;
