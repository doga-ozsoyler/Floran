import express from "express";
import { postPlantController } from "../controllers/plantController";
import { verifyToken } from "../middlewares/auth";

const plantRoutes = express.Router();

plantRoutes.post("/new", verifyToken, postPlantController);

export default plantRoutes;
