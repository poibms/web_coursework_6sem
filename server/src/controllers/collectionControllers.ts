import { Request, Response, NextFunction } from 'express';
import { IGetUserAuthInfoRequest } from '../middleware/authMiddleware';

const ApiError = require('../error/apiError');
const collectionService = require('../services/collectionService');

class CollectionControllers {
  async createCollection(req: any, res: Response, next: NextFunction) {
    try {
      const { id } = req.user;
      const { title, description, tags } = req.body;
      const { image } = req.files;
      const collection = await collectionService.createCollection(
        id,
        title,
        description,
        image,
      );
      await collectionService.addCollectTags(collection.id, tags);
      return res.json({ collection });
    } catch (e) {
      next(e);
    }
  }

  async getCollections(req: Request, res: Response, next: NextFunction) {
    try {
      const collections = await collectionService.getCollections();
      return res.json(collections);
    } catch (e) {
      next(e);
    }
  }

  async getCollectionsByUserId(
    req: IGetUserAuthInfoRequest,
    res: Response,
    next: NextFunction,
  ) {
    try {
      console.log(req.user);
      const { id } = req.user;
      const collections = await collectionService.getCollectionsByUserId(id);
      return res.json(collections);
    } catch (e) {
      next(e);
    }
  }

  async getColById(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id;
      // eslint-disable-next-line prefer-const
      let { collection, collectItems } = await collectionService.getColById(id);
      collection = collection.rows[0];
      return res.json({ collection, collectItems });
    } catch (e) {
      next(ApiError.BadRequest(e));
    }
  }

  async deleteCollection(
    req: IGetUserAuthInfoRequest,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const { id, role } = req.user;
      const colId = req.params.colId;
      await collectionService.deleteCollection(id, colId, role);
      return res.json('successfully deleted');
    } catch (e) {
      next(ApiError.BadRequest(e));
    }
  }

  public async updateCollection(req: any, res: Response, next: NextFunction) {
    try {
      const { id } = req.user;
      const colId = req.params.id;
      const payload = req.body;
      console.log(payload);
      const image = req.files;
      let updatedCol;
      if (!image) {
        updatedCol = await collectionService.updateCollection(
          id,
          payload,
          colId,
        );
      } else {
        updatedCol = await collectionService.updateCollection(
          id,
          payload,
          image,
          colId,
        );
      }

      return res.json(updatedCol);
    } catch (e) {
      next(e);
    }
  }

  public async getCollByTags(req: IGetUserAuthInfoRequest, res: Response, next: NextFunction) {
    try {
      const tags = req.query.tags;

      const collections = await collectionService.getCollByTags(tags);
      return res.json(collections);
    } catch (e) {
      next(e);
    }
  }

}
module.exports = new CollectionControllers();
