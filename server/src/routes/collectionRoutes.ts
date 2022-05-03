export {};
const collectionControllers = require('../controllers/collectionControllers');
const itemsController = require('../controllers/itemsControllers');
const authMiddleware = require('../middleware/authMiddleware');
const Router = require('express');
const router = new Router();

router.get(
  '/user',
  authMiddleware,
  collectionControllers.getCollectionsByUserId,
);
router.get('/:id', collectionControllers.getColById);
router.post('/', authMiddleware, collectionControllers.createCollection);
router.delete(
  '/:colId',
  authMiddleware,
  collectionControllers.deleteCollection,
);
router.get('/', collectionControllers.getCollections);
router.get('/bytags', collectionControllers.getCollByTags);
router.put('/:id', authMiddleware, collectionControllers.updateCollection);
router.post('/:id', authMiddleware, itemsController.createItem);
router.delete('/:id/:itemId', authMiddleware, itemsController.deleteItem);
router.put('/:id/:itemId', authMiddleware, itemsController.updateItem);

module.exports = router;
