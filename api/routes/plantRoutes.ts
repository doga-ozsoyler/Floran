import express from "express";
import {
  postPlantController,
  updatePlantController,
} from "../controllers/plantController";
import { verifyToken } from "../middlewares/auth";

const plantRoutes = express.Router();

plantRoutes.post("/new", verifyToken, postPlantController);
plantRoutes.put("/update/:plantID", verifyToken, updatePlantController);

export default plantRoutes;
