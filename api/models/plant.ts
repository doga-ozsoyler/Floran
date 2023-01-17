import mongoose from "mongoose";
import { IPlant } from "../config/interface";

const PlantSchema = new mongoose.Schema({
  name: { type: String, require: true },
  petFriendly: { type: Boolean, require: true },
  sunExposure: { type: Number, require: true },
  fertilizer: { type: Number, require: true },
  picture: { type: String, require: true },
});

const Plant = mongoose.model<IPlant>("Plant", PlantSchema);

export { Plant };
