import { RequestHandler, Request, Response } from "express";
import { IReqAuth } from "../config/interface";
import { User } from "../models/user";

export const getUserController: RequestHandler = async (
  req: IReqAuth,
  res: Response
) => {
  try {
    if (!req.user)
      return res.json({ success: false, message: "Invalid Authentication" });
    const { _id } = req.user;
    console.log("here");
    console.log(_id);
    const user = await User.findById(_id).select("-password");

    console.log(user);

    res.json({
      success: true,
      message: "User is successfully returned!",
      user,
    });
  } catch (error) {
    res.json({ success: false, error });
  }
};
