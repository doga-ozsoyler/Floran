import express from "express";
import {
  deleteUserController,
  getUserController,
  ownPlantUserController,
  updateUserController,
  updateUserPasswordController,
} from "../controllers/userController";
import { verifyToken } from "../middlewares/auth";

const userRoutes = express.Router();

userRoutes.get("/get", verifyToken, getUserController);
userRoutes.put("/update/info", verifyToken, updateUserController);
userRoutes.put("/update/password", verifyToken, updateUserPasswordController);
userRoutes.put("/own/plants", verifyToken, ownPlantUserController);
userRoutes.delete("/delete", verifyToken, deleteUserController);

export default userRoutes;
