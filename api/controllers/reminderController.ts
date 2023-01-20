import { RequestHandler, Request, Response } from "express";
import { IReqAuth } from "../config/interface";
import { Reminder } from "../models/reminder";
import { User } from "../models/user";

export const postReminderController: RequestHandler = async (
  req: IReqAuth,
  res: Response
) => {
  try {
    if (!req.user)
      return res.json({ success: false, message: "Invalid Authentication" });

    const reminder = await Reminder.create({
      plant: req.body.plant,
      repeat: req?.body?.repeat,
      time: req?.body?.time,
    });

    const user = await User.find({
      _id: req.user._id,
      plants: req.body.plant,
    });

    const pushObject = !user.length
      ? { plants: req.body.plant, reminders: reminder._id }
      : { reminders: reminder._id };

    await User.findByIdAndUpdate(req.user._id, {
      $push: pushObject,
    });

    res.json({
      success: true,
      message: "Reminder is successfully created!",
      reminder,
    });
  } catch (error) {
    res.json({ success: false, error });
  }
};

export const getReminderController: RequestHandler = async (
  req: IReqAuth,
  res: Response
) => {
  try {
    const { reminderID } = req.params;

    if (!req.user)
      return res.json({ success: false, message: "Invalid Authentication" });

    const user = await User.find({
      _id: req.user._id,
      reminders: reminderID,
    });

    if (!user.length)
      return res.json({
        success: false,
        message: "Reminder doesn't belong the user!",
      });

    const reminder = await Reminder.findById(reminderID);

    res.json({
      success: true,
      message: "Reminder is successfully returned!",
      reminder,
    });
  } catch (error) {
    res.json({ success: false, error });
  }
};

export const updateReminderController: RequestHandler = async (
  req: IReqAuth,
  res: Response
) => {
  try {
    const { reminderID } = req.params;

    if (!req.user)
      return res.json({
        success: false,
        message: "Invalid Authentication",
      });

    const user = await User.find({
      _id: req.user._id,
      reminders: reminderID,
    });

    if (!user.length)
      return res.json({
        success: false,
        message: "Reminder doesn't belong the user!",
      });

    await Reminder.findByIdAndUpdate(reminderID, {
      repeat: req?.body?.repeat,
      time: req?.body?.time,
    });

    res.json({
      success: true,
      message: "Reminder is successfully updated!",
    });
  } catch (error) {
    res.json({ success: false, error });
  }
};

export const deleteReminderController: RequestHandler = async (
  req: IReqAuth,
  res: Response
) => {
  try {
    const { reminderID } = req.params;

    if (!req.user)
      return res.json({
        success: false,
        message: "Invalid Authentication",
      });

    const user = await User.find({
      _id: req.user._id,
      reminders: reminderID,
    });

    if (!user.length)
      return res.json({
        success: false,
        message: "Reminder doesn't belong the user!",
      });

    await Reminder.findByIdAndDelete(reminderID);
    await User.findByIdAndUpdate(req.user._id, {
      $pull: { reminders: reminderID },
    });

    res.json({
      success: true,
      message: "Reminder is successfully deleted!",
    });
  } catch (error) {
    res.json({ success: false, error });
  }
};
