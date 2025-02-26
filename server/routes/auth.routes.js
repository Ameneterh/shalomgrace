import express from "express";
import {
  userRegistration,
  verifyHandlerRegistration,
  userLogin,
  logout,
  forgotPassword,
  resetPassword,
  CheckAuth,
  editUser,
  getAllUsers,
  getLastMonthUsers,
} from "../controllers/auth.controller.js";
import { verifyToken } from "../middlewares/verifyToken.js";

const router = express.Router();

router.get("/check-auth", verifyToken, CheckAuth);

router.post("/user-registration", userRegistration);
router.get("/get-users", getAllUsers);
router.get("/last-month-users", getLastMonthUsers);
router.post("/edit-user/:id", verifyToken, editUser);
router.post("/verify-handler", verifyHandlerRegistration);
router.post("/user-login", userLogin);
router.post("/user-logout", logout);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", resetPassword);

export default router;
