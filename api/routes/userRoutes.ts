import express from "express";
import { getUserController } from "../controllers/userController";
import { verifyToken } from "../middlewares/auth";

const userRoutes = express.Router();

userRoutes.get("/get", verifyToken, getUserController);

export default userRoutes;
