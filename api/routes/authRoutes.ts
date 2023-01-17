import express from "express";
import {
  signupController,
  signinController,
} from "../controllers/authController";

const authRoutes = express.Router();

authRoutes.post("/signup", signupController);
authRoutes.post("/signin", signinController);

export default authRoutes;
