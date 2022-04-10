export {}
const userController = require('../controllers/userControllers');
const authMiddleware = require('../middleware/authMiddleware');
const Router = require("express");
const router = new Router();

router.post('/', userController.registration);
router.post('/login', userController.login);
router.get('/', authMiddleware, userController.getUser);

module.exports = router;