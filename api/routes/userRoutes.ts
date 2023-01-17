import express from "express";
import {
  getUserController,
  updateUserController,
} from "../controllers/userController";
import { verifyToken } from "../middlewares/auth";

const userRoutes = express.Router();

userRoutes.get("/get", verifyToken, getUserController);
userRoutes.put("/update/info", verifyToken, updateUserController);

export default userRoutes;
