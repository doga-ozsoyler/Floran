import mongoose from "mongoose";

const ReminderSchema = new mongoose.Schema({
  plant: { type: mongoose.Schema.Types.ObjectId, ref: "Plant" },
  repeat: { type: Number, require: true },
  time: { type: Date, require: true },
});

const Reminder = mongoose.model("Reminder", ReminderSchema);

export { Reminder };
