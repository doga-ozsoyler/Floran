import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  nickname: { type: String, require: true },
  email: { type: String, require: true },
  password: { type: String, require: true },
  plants: [{ type: mongoose.Schema.Types.ObjectId, ref: "Plant" }],
  reminders: [{ type: mongoose.Schema.Types.ObjectId, ref: "Reminder" }],
  addedPlants: [{ type: mongoose.Schema.Types.ObjectId, ref: "Plant" }],
});

const User = mongoose.model("User", UserSchema);

export { User };
