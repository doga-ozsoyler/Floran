const express = require("express");
import dbConnect from "./config/dbConnect";
import authRoutes from "./routes/authRoutes";
import userRoutes from "./routes/userRoutes";
import plantRoutes from "./routes/plantRoutes";
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(
  cors({
    origin: true,
    credential: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

if (process.env.NODE_ENV !== "TEST") {
  dbConnect();
}

app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/plant", plantRoutes);

if (process.env.NODE_ENV !== "TEST") {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, console.log(`Server running at PORT ${PORT}`));
}

export default app;
