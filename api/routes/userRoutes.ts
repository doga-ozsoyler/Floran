import express from "express";
import {
  getUserController,
  updateUserController,
  updateUserPasswordController,
} from "../controllers/userController";
import { verifyToken } from "../middlewares/auth";

const userRoutes = express.Router();

userRoutes.get("/get", verifyToken, getUserController);
userRoutes.put("/update/info", verifyToken, updateUserController);
userRoutes.put("/update/password", verifyToken, updateUserPasswordController);

export default userRoutes;
