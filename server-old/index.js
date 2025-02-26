import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import path from "path";

import authRouter from "./routes/auth.route.js";
import userRouter from "./routes/user.route.js";

dotenv.config();

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log(err);
  });

const __dirname = path.resolve();

const app = express();
app.use(express.json());
// app.use(cookieParser());

app.listen(5000, () => {
  console.log("Server is running on port 5000");
});

// routes
app.use("/server/user", userRouter);
app.use("/server/auth", authRouter);
// app.use("/server/post", postRouter);
// app.use("/server/comment", commentRouter);
// app.use("/server/saved", savedRouter);

app.use(express.static(path.join(__dirname, "/frontend/dist")));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
});

// app.use((err, req, res, next) => {
//   const statusCode = err.statusCode || 500;
//   const message = err.message || "Internal Server Error";
//   res.status(statusCode).json({
//     success: false,
//     statusCode,
//     message,
//   });
// });
