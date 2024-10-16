import express from "express";
import dotenv from "dotenv";
import path from "path";

dotenv.config();

// mongoose
//   .connect(process.env.MONGO)
//   .then(() => {
//     console.log("Connected to MongoDB");
//   })
//   .catch((err) => {
//     console.log(err);
//   });

const __dirname = path.resolve();

const app = express();
app.use(express.json());
// app.use(cookieParser());

app.listen(5000, () => {
  console.log("Server is running on port 5000");
});

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
