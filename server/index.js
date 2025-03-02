import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import path from "path";

import dbConnection from "./config/dbConfig.js";
import authRouter from "./routes/auth.routes.js";
import postRouter from "./routes/post.routes.js";
import videoRouter from "./routes/video.routes.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;
const __dirname = path.resolve();

app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());
app.use(cookieParser());

app.use("/server/auth", authRouter);
app.use("/server/post", postRouter);
app.use("/server/video", videoRouter);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
  });
}

app.listen(PORT, () => {
  dbConnection(), console.log(`NodeJS/Express Server Started on Port ${PORT}`);
});
