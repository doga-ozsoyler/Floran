import { Request } from "express";
import { Document, ObjectId } from "mongoose";

export interface IDecoded {
  id?: string;
  iat: number;
  exp: number;
}

export interface IUser extends Document {
  nickname: string;
  email: string;
  password: string;
  plants: ObjectId[];
  reminders: ObjectId[];
  addedPlants: ObjectId[];
}

export interface IReqAuth extends Request {
  user?: IUser;
}

export interface IPlant extends Document {
  name: string;
  petFriendly: boolean;
  sunExposure: number;
  fertilizer: number;
  picture: string;
}
