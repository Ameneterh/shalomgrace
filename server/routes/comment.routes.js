import express from "express";
import {
  addComment,
  getComments,
  // updateComment,
} from "../controllers/post.controller.js";

const router = express.Router();

router.post("/add-comment", addComment);
router.get("/get-comments", getComments);
// router.put("/edit-comment/:id", updateComment);

export default router;
