import express from "express";
import {
  deletePlantController,
  postPlantController,
  updatePlantController,
  getPlantController,
  getAllPlantController,
} from "../controllers/plantController";
import { verifyToken } from "../middlewares/auth";

const plantRoutes = express.Router();

plantRoutes.post("/new", verifyToken, postPlantController);
plantRoutes.put("/update/:plantID", verifyToken, updatePlantController);
plantRoutes.delete("/delete/:plantID", verifyToken, deletePlantController);
plantRoutes.get("/get/:plantID", getPlantController);
plantRoutes.get("/all", getAllPlantController);

export default plantRoutes;
