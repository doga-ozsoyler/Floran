import { RequestHandler, Response } from "express";
import { IReqAuth } from "../config/interface";
import { User } from "../models/user";
import { Plant } from "../models/plant";

export const postPlantController: RequestHandler = async (
  req: IReqAuth,
  res: Response
) => {
  try {
    if (!req.user)
      return res.json({ success: false, message: "Invalid Authentication" });

    const plant = await Plant.create({
      name: req?.body?.name,
      petFriendly: req?.body?.petFriendly,
      sunExposure: req?.body?.sunExposure,
      fertilizer: req?.body?.fertilizer,
      picture: req?.body?.picture,
    });

    await User.findByIdAndUpdate(req.user._id, {
      $push: { addedPlants: plant._id },
    });

    res.json({ success: false, plant });
  } catch (error) {
    res.json({ success: false, error });
  }
};

export const updatePlantController: RequestHandler = async (
  req: IReqAuth,
  res: Response
) => {
  try {
    const { plantID } = req?.params;

    if (!req.user)
      return res.json({ success: false, message: "Invalid Authentication" });

    const user = await User.find({
      _id: req.user._id,
      addedPlants: plantID,
    });

    if (!user.length)
      return res.json({
        success: false,
        message: "Plant doesn't belong the user!",
      });

    await Plant.findByIdAndUpdate(plantID, {
      name: req?.body?.name,
      petFriendly: req?.body?.petFriendly,
      sunExposure: req?.body?.sunExposure,
      fertilizer: req?.body?.fertilizer,
      picture: req?.body?.picture,
    });

    res.json({ success: true, message: "Plant is successfully updated!" });
  } catch (error) {
    res.json({ success: false, error });
  }
};
