import { Response, NextFunction } from 'express';
import { IGetUserAuthInfoRequest } from '../middleware/authMiddleware';

const itemsService = require('../services/itemService');

class ItemsControllers {
  async createItem(req: any, res: Response, next: NextFunction) {
    try {
      const { title, description } = req.body;
      const { image } = req.files;
      const { id } = req.user;
      const collectId = req.params.id;
      const item = await itemsService.createItem(
        title,
        description,
        image,
        collectId,
        id,
      );
      return res.json(item);
    } catch (err) {
      next(err);
    }
  }

  async deleteItem(
    req: IGetUserAuthInfoRequest,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const { id } = req.user;
      const colId = req.params.id;
      const itemId = req.params.itemId;
      await itemsService.deleteItem(id, colId, itemId);
      return res.json('successfully deleted');
    } catch (e) {
      next(e);
    }
  }

  public async updateItem(req: any, res: Response, next: NextFunction) {
    try {
      const { id } = req.user;
      const itemId = req.params.itemId;
      console.log(itemId);
      const payload = req.body;
      const image = req.files;
      let updatedCol;
      if(!image) {
        updatedCol = await itemsService.updateItem(
          id,
          payload,
          itemId,
        );  
      }
       updatedCol = await itemsService.updateItem(
        id,
        payload,
        itemId,
        image
      );
      return res.json(updatedCol);
    } catch (e) {
      next(e);
    }
  }

}

module.exports = new ItemsControllers();
