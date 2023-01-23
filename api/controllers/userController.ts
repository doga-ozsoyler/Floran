import { RequestHandler, Response } from "express";
import { IReqAuth } from "../config/interface";
import { User } from "../models/user";
import bcrypt from "bcrypt";
import { Reminder } from "../models/reminder";

export const getUserController: RequestHandler = async (
  req: IReqAuth,
  res: Response
) => {
  try {
    if (!req.user)
      return res.json({ success: false, message: "Invalid Authentication" });

    const user = await User.findById(req.user._id).select("-password");

    res.json({
      success: true,
      message: "User is successfully returned!",
      user,
    });
  } catch (error) {
    res.json({ success: false, error });
  }
};

export const updateUserController: RequestHandler = async (
  req: IReqAuth,
  res: Response
) => {
  try {
    if (!req.user)
      return res.json({ success: false, message: "Invalid Authentication" });

    await User.findByIdAndUpdate(req.user._id, {
      nickname: req?.body?.nickname,
      email: req?.body?.email,
    });

    res.json({ success: true, message: "User is successfully updated!" });
  } catch (error) {
    res.json({ success: false, error });
  }
};

export const updateUserPasswordController: RequestHandler = async (
  req: IReqAuth,
  res: Response
) => {
  try {
    if (!req.user)
      return res.json({ success: false, message: "Invalid Authentication" });

    const user = await User.findById(req.user._id);

    const comparePasswords = bcrypt.compareSync(
      req?.body?.oldPassword,
      `${user?.password}`
    );

    if (!comparePasswords)
      return res.json({ success: false, message: "Password is incorrect" });

    const newPasswordHash = await bcrypt.hash(req?.body?.newPassword, 15);

    await User.findByIdAndUpdate(req.user._id, {
      password: newPasswordHash,
    });

    res.json({ success: true, message: "Password is successfully updated!" });
  } catch (error) {
    res.json({ success: false, error });
  }
};

export const ownPlantUserController: RequestHandler = async (
  req: IReqAuth,
  res: Response
) => {
  try {
    if (!req.user)
      return res.json({ success: false, message: "Invalid Authentication" });

    const user = await User.findById(req.user._id);
    if (user && !user.plants.includes(req.body.plantID)) {
      await user.updateOne({ $push: { plants: req.body.plantID } });
      res.json({
        success: true,
        message: "Plant is successfully added plants list!",
      });
    } else if (user) {
      await user.updateOne({ $pull: { plants: req.body.plantID } });
      res.json({
        success: true,
        message: "Plant is successfully outed plants list!",
      });
    }
  } catch (error) {
    res.json({ success: false, error });
  }
};

export const deleteUserController: RequestHandler = async (
  req: IReqAuth,
  res: Response
) => {
  try {
    console.log(req.user);
    if (!req.user)
      return res.json({ success: false, message: "Invalid Authentication" });

    const user = await User.findByIdAndDelete(req.user._id);

    const allUserReminder = user ? user.reminders : [];

    for (let i = 0; i < allUserReminder.length; i++) {
      await Reminder.findByIdAndDelete(allUserReminder[i]);
    }

    res.json({ success: true, message: "User is successfully deleted!" });
  } catch (error) {
    res.json({ success: false, error });
  }
};
