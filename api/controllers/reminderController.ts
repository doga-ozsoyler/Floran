import { RequestHandler, Response } from "express";
import { IReqAuth } from "../config/interface";
import { Reminder } from "../models/reminder";
import { User } from "../models/user";
import { getOrSetCache } from "../utils/redis";

export const postReminderController: RequestHandler = async (
  req: IReqAuth,
  res: Response
) => {
  try {
    if (!req.user)
      return res
        .status(401)
        .json({ success: false, message: "Invalid Authentication" });

    const reminder = await Reminder.create({
      plant: req.body.plant,
      repeat: req?.body?.repeat,
      time: req?.body?.time,
    });

    const user = await User.findById(req.user._id);

    if (user && !user.plants.includes(req.body.plantID)) {
      await user.updateOne({
        $push: { plants: req.body.plant, reminders: reminder._id },
      });
    } else if (user) {
      await user.updateOne({ $push: { reminders: reminder._id } });
    }

    res.status(200).json({
      success: true,
      message: "Reminder is successfully created!",
      reminder,
    });
  } catch (error) {
    res.status(500).json({ success: false, error });
  }
};

export const getReminderController: RequestHandler = async (
  req: IReqAuth,
  res: Response
) => {
  try {
    const { reminderID } = req.params;

    if (!req.user)
      return res
        .status(401)
        .json({ success: false, message: "Invalid Authentication" });

    const { _id } = req.user;

    const user = await getOrSetCache(`user${_id}`, async () => {
      const user = await User.findById(_id);

      return user;
    });

    if (!user.reminders.includes(reminderID))
      return res.status(403).json({
        success: false,
        message: "Reminder doesn't belong the user!",
      });

    const reminder = await getOrSetCache(`reminder${_id}`, async () => {
      const reminder = await Reminder.findById(reminderID).populate("plant");

      return reminder;
    });

    res.status(200).json({
      success: true,
      message: "Reminder is successfully returned!",
      reminder,
    });
  } catch (error) {
    res.status(500).json({ success: false, error });
  }
};

export const updateReminderController: RequestHandler = async (
  req: IReqAuth,
  res: Response
) => {
  try {
    const { reminderID } = req.params;

    if (!req.user)
      return res.status(401).json({
        success: false,
        message: "Invalid Authentication",
      });

    const user = await User.find({
      _id: req.user._id,
      reminders: reminderID,
    });

    if (!user.length)
      return res.status(403).json({
        success: false,
        message: "Reminder doesn't belong the user!",
      });

    await Reminder.findByIdAndUpdate(reminderID, {
      repeat: req?.body?.repeat,
      time: req?.body?.time,
    });

    res.status(200).json({
      success: true,
      message: "Reminder is successfully updated!",
    });
  } catch (error) {
    res.status(500).json({ success: false, error });
  }
};

export const deleteReminderController: RequestHandler = async (
  req: IReqAuth,
  res: Response
) => {
  try {
    const { reminderID } = req.params;

    if (!req.user)
      return res.status(401).json({
        success: false,
        message: "Invalid Authentication",
      });

    const user = await User.find({
      _id: req.user._id,
      reminders: reminderID,
    });

    if (!user.length)
      return res.status(403).json({
        success: false,
        message: "Reminder doesn't belong the user!",
      });

    await Reminder.findByIdAndDelete(reminderID);
    await User.findByIdAndUpdate(req.user._id, {
      $pull: { reminders: reminderID },
    });

    res.status(200).json({
      success: true,
      message: "Reminder is successfully deleted!",
    });
  } catch (error) {
    res.status(500).json({ success: false, error });
  }
};
