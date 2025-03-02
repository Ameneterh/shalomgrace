import express from "express";
import { addVideo, getVideos } from "../controllers/video.controller.js";

const router = express.Router();

router.post("/add-video", addVideo);
router.get("/get-videos", getVideos);

export default router;
