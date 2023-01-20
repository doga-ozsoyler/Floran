import express from "express";
import {
  deleteReminderController,
  getReminderController,
  postReminderController,
  updateReminderController,
} from "../controllers/reminderController";
import { verifyToken } from "../middlewares/auth";

const reminderRoutes = express.Router();

reminderRoutes.post("/new", verifyToken, postReminderController);
reminderRoutes.get("/get/:reminderID", verifyToken, getReminderController);
reminderRoutes.put(
  "/update/:reminderID",
  verifyToken,
  updateReminderController
);
reminderRoutes.delete(
  "/delete/:reminderID",
  verifyToken,
  deleteReminderController
);

export default reminderRoutes;
