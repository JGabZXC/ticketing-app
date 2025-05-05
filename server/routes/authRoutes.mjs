import express from "express";
import {
  register,
  login,
  logout,
  getMe,
} from "../controllers/authController.mjs";
import { isAuthenticated } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.route("/login").post(login);
router.route("/register").post(register);
router.route("/logout").get(isAuthenticated, logout);
router.route("/me").get(isAuthenticated, getMe);

export default router;
