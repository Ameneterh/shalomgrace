import express from "express";
import {
  createPost,
  getPostBySlug,
  getPosts,
  updatePost,
} from "../controllers/post.controller.js";

const router = express.Router();

router.post("/create-post", createPost);
router.post("/update-post/:postId", updatePost);
router.get("/get-posts", getPosts);
router.get("/get-post/:slug", getPostBySlug);

export default router;
