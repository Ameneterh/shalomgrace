import express from "express";
import {
  acceptedChrist,
  getMessages,
} from "../controllers/saved.controller.js";

const router = express.Router();

router.post("/accepted-christ", acceptedChrist);
router.get("/get-saveds", getMessages);

export default router;
