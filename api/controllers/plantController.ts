import { RequestHandler, Request, Response } from "express";
import { IReqAuth } from "../config/interface";
import { User } from "../models/user";
import { Plant } from "../models/plant";
import { ObjectId } from "mongoose";
import { getOrSetCache } from "../utils/redis";

export const postPlantController: RequestHandler = async (
  req: IReqAuth,
  res: Response
) => {
  try {
    if (!req.user)
      return res
        .status(401)
        .json({ success: false, message: "Invalid Authentication" });

    const plant = await Plant.create({
      name: req?.body?.name,
      whenToWater: {
        min: req?.body?.whenToWater?.min,
        max: req?.body?.whenToWater?.max,
      },
      petFriendly: req?.body?.petFriendly,
      sunExposure: req?.body?.sunExposure,
      fertilizer: req?.body?.fertilizer,
      picture: req?.body?.picture,
    });

    await User.findByIdAndUpdate(req.user._id, {
      $push: { addedPlants: plant._id },
    });

    res.status(200).json({
      success: true,
      message: "Plant is successfully created!",
      plant,
    });
  } catch (error) {
    res.status(500).json({ success: false, error });
  }
};

const isPlantBelongUser = async (userID: ObjectId, plantID: string) => {
  const user = await User.find({
    _id: userID,
    addedPlants: plantID,
  });

  if (!user.length) return false;

  return true;
};

export const updatePlantController: RequestHandler = async (
  req: IReqAuth,
  res: Response
) => {
  try {
    const { plantID } = req?.params;

    if (!req.user)
      return res
        .status(401)
        .json({ success: false, message: "Invalid Authentication" });

    if (!(await isPlantBelongUser(req.user._id, plantID)))
      return res.status(403).json({
        success: false,
        message: "Plant doesn't belong the user!",
      });

    await Plant.findByIdAndUpdate(plantID, {
      name: req?.body?.name,
      whenToWater: {
        min: req?.body?.whenToWater?.min,
        max: req?.body?.whenToWater?.max,
      },
      petFriendly: req?.body?.petFriendly,
      sunExposure: req?.body?.sunExposure,
      fertilizer: req?.body?.fertilizer,
      picture: req?.body?.picture,
    });

    res
      .status(200)
      .json({ success: true, message: "Plant is successfully updated!" });
  } catch (error) {
    res.status(500).json({ success: false, error });
  }
};

export const deletePlantController: RequestHandler = async (
  req: IReqAuth,
  res: Response
) => {
  try {
    const { plantID } = req?.params;

    if (!req.user)
      return res
        .status(401)
        .json({ success: false, message: "Invalid Authentication" });

    if (!(await isPlantBelongUser(req.user._id, plantID)))
      return res.status(403).json({
        success: false,
        message: "Plant doesn't belong the user!",
      });

    await Plant.findByIdAndDelete(plantID);
    await User.findByIdAndUpdate(req.user._id, {
      $pull: { addedPlants: plantID },
    });

    res
      .status(200)
      .json({ success: true, message: "Plant is successfully deleted!" });
  } catch (error) {
    res.status(500).json({ success: false, error });
  }
};

export const getPlantController: RequestHandler = async (
  req: Request,
  res: Response
) => {
  try {
    const { plantID } = req?.params;

    const plant = await Plant.findById(plantID);

    res.status(200).json({
      success: false,
      message: "Plant is successfully returned!",
      plant,
    });
  } catch (error) {
    res.status(500).json({ success: false, error });
  }
};

export const getAllPlantController: RequestHandler = async (
  req: Request,
  res: Response
) => {
  try {
    const allPlant = await getOrSetCache("allPlant", async () => {
      const allPlant = await Plant.find({});

      return allPlant;
    });

    res.status(200).json({
      success: true,
      message: "All plants are successfully returned!",
      allPlant,
    });
  } catch (error) {
    res.status(500).json({ success: false, error });
  }
};
