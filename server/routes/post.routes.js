import express from "express";
import {
  createPost,
  getPostBySlug,
  getPosts,
} from "../controllers/post.controller.js";

const router = express.Router();

router.post("/create-post", createPost);
router.get("/get-posts", getPosts);
router.get("/get-post/:slug", getPostBySlug);

export default router;
