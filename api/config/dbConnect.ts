const mongoose = require("mongoose");
require("dotenv").config();

function getErrorMessage(error: unknown) {
  if (error instanceof Error) return error.message;
  return String(error);
}

const dbConnect = async () => {
  try {
    mongoose.set("strictQuery", false);

    await mongoose.connect(process.env.MONGO_URI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });

    console.log("Database connected");
  } catch (error) {
    console.log(`Database error: ${getErrorMessage(error)}`);
  }
};

export default dbConnect;
