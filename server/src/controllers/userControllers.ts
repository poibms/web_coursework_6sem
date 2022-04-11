import { Request, Response, NextFunction } from 'express';
import { IGetUserAuthInfoRequest } from '../middleware/authMiddleware';
const userService = require('../services/userService');
const tokenService = require('../services/tokenService');

class UserControllers {
  async registration(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body;
      const user = await userService.registration(email, password);
      const token = tokenService.generate({
        id: user.id,
        email,
        role: user.role,
      });
      return res.json({ token });
    } catch (e) {
      next(e);
    }
  }

  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body;
      const user = await userService.login(email, password);
      const token = tokenService.generate({
        id: user.id,
        email,
        role: user.role,
      });
      return res.json({ token });
    } catch (e) {
      next(e);
    }
  }

  async getUser(
    req: IGetUserAuthInfoRequest,
    res: Response,
    next: NextFunction,
  ) {
    const { id } = req.user;
    const user = await userService.getUser(id);
    return res.json(user);
  }
}

module.exports = new UserControllers();
