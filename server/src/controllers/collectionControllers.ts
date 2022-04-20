import { Request, Response, NextFunction } from 'express';
import { IGetUserAuthInfoRequest } from '../middleware/authMiddleware';

const ApiError = require('../error/apiError');
const collectionService = require('../services/collectionService');

class CollectionControllers {
  async createCollection(req: any, res: Response, next: NextFunction) {
    try {
      const { id } = req.user;
      const { title, description, tags } = req.body;
      console.log(tags);
      const { image } = req.files;
      const collection = await collectionService.createCollection(
        id,
        title,
        description,
        image,
      );
      await collectionService.addCollectTags(tags);
      return res.json({ collection });
    } catch (e) {
      next(e);
    }
  }

  async getColById(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id;
      const { collection } = await collectionService.getColById(id);
      return res.json(collection.rows[0]);
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

  public async updateCollection(
    req: IGetUserAuthInfoRequest,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const { id } = req.user;
      const colId = req.params.id;
      const { payload } = req.body;
      return collectionService.updateCollection(id, payload, colId);
    } catch (e) {
      next(e);
    }
  }
}
module.exports = new CollectionControllers();
