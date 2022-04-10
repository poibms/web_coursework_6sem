import { Request, Response, NextFunction } from "express";
const jwt = require("jsonwebtoken");

export interface IGetUserAuthInfoRequest extends Request {
  user: any;
}

module.exports = function (
  req: IGetUserAuthInfoRequest,
  res: Response,
  next: NextFunction
) {
  try {
    const token = req.headers.authorization!.split(" ")[1]; //Bearer afsafasfsaf
    if (!token) {
      return res.status(401).json({ message: "user is not authorized" });
    }
    const decodeToken = jwt.verify(token, process.env.SECRET_KEY);
    // console.log(decodeToken);
    req.user = decodeToken;
    next();
  } catch (e) {
    return res.status(401).json({ message: "user is not authorized" });
  }
};
