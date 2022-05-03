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
        status: user.status,
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
        status: user.status,
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

  async getAllUsers (req: Request, res: Response, next: NextFunction) {
    try {
      const users = await userService.getAllUsers();
      return res.json(users)
    } catch (e) {
      next(e)
    }
  }

  async limitationUser(
    req: IGetUserAuthInfoRequest,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const { role } = req.user;
      const userId = req.params.id;
      const user = await userService.limitationUser(role, userId);
      return res.json(user);
    } catch (e) {
      next(e);
    }
  }

  async check(req: IGetUserAuthInfoRequest, res: Response, next: NextFunction) {
    const token = tokenService.generate({
      id: req.user.id,
      email: req.user.email,
      role: req.user.role,
      status: req.user.status,
    });
    return res.json({ token });
  }
}

module.exports = new UserControllers();
