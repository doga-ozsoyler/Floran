const express = require("express");
import dbConnect from "./config/dbConnect";
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

dbConnect();

const PORT = process.env.PORT || 3000;

app.listen(PORT, console.log(`Server running at PORT ${PORT}`));
