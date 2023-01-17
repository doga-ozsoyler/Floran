import { RequestHandler, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { IDecoded, IReqAuth } from "../config/interface";
import { User } from "../models/user";
require("dotenv").config();

export const verifyToken: RequestHandler = async (
  req: IReqAuth,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req?.headers?.authorization;
    if (!token)
      return res.json({ success: false, message: "Invalid Authentication" });

    const decoded = <IDecoded>jwt.verify(token, `${process.env.JWT_SECRET}`);
    if (!decoded)
      return res.json({ success: false, message: "Invalid Authentication" });

    const user = await User.findById({ _id: decoded.id }).select("-password");
    if (!user)
      return res.json({ success: false, message: "User doesn't exist" });

    req.user = user;

    next();
  } catch (error) {
    res.json({ success: false, error });
  }
};
