import { Request, Response, NextFunction } from 'express';
import { IGetUserAuthInfoRequest } from '../middleware/authMiddleware';

const tagsService = require('../services/tagsService');

class TagsControllers {
  async createTag(req: Request, res: Response, next: NextFunction) {
    try {
      const { text } = req.body;
      console.log(text);
      const tag = await tagsService.createTag(text);
      return res.json({ tag });
    } catch (err) {
      next(err);
    }
  }

  async getAllTags(req: Request, res: Response, next: NextFunction) {
    try {
      const tags = await tagsService.getAllTags();
      return res.json({ tags });
    } catch (e) {
      next(e);
    }
  }
}

module.exports = new TagsControllers();
