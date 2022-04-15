export {};
const collectionControllers = require('../controllers/collectionControllers');
const itemsController = require('../controllers/itemsControllers');
const authMiddleware = require('../middleware/authMiddleware');
const Router = require('express');
const router = new Router();

router.get('/:id', collectionControllers.getColById);
router.post('/', authMiddleware, collectionControllers.createCollection);
router.delete(
  '/:colId',
  authMiddleware,
  collectionControllers.deleteCollection,
);
router.post('/:id', authMiddleware, itemsController.createItem);
router.delete('/:id/:itemId', authMiddleware, itemsController.deleteItem);

module.exports = router;
