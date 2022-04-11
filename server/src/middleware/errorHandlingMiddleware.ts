export {};
import { Request, Response, NextFunction } from 'express';
const ApiError = require('../error/apiError');
module.exports = function (
  err: { status: number; message: string; errors: [] },
  req: Request,
  res: Response,
  next: NextFunction,
) {
  console.log(err);

  if (err instanceof ApiError) {
    return res
      .status(err.status)
      .json({ message: err.message, errors: err.errors });
  }
  return res.status(500).json({ message: 'Непредвиденная ошибка' });
};
