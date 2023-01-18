import express from "express";
import {
  deletePlantController,
  postPlantController,
  updatePlantController,
} from "../controllers/plantController";
import { verifyToken } from "../middlewares/auth";

const plantRoutes = express.Router();

plantRoutes.post("/new", verifyToken, postPlantController);
plantRoutes.put("/update/:plantID", verifyToken, updatePlantController);
plantRoutes.delete("/delete/:plantID", verifyToken, deletePlantController);

export default plantRoutes;
