import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import hotelsRoute from "../api/routes/hotels.js";
import cookieParser from "cookie-parser";
import usersRoute from "../api/routes/user.js";
import roomsRoute from "../api/routes/room.js";

const app = express();
const PORT = 4000 || 8000;
dotenv.config();

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to DataBase");
  } catch (error) {
    throw error;
  }
};

mongoose.connection.on("disconnected", () => {
  console.log("MongoDB disconnected");
});

mongoose.connection.on("connected", () => {
  console.log("MongoDB connected");
});

app.use(cookieParser());
app.use(express.json());

app.use("/api/hotels", hotelsRoute);
app.use("api/users", usersRoute);
app.use("api/rooms", roomsRoute);

app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Something went wrong";

  return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
    stack: err.stack,
  });
});

app.listen(PORT, () => {
  connect();
  console.log(`Server connected at port : ${PORT}`);
});
