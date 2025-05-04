import express from "express";
import { register, login, logout } from "../controllers/authController.mjs";
import { isAuthenticated } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.route("/login").post(login);
router.route("/register").post(register);
router.route("/logout").get(isAuthenticated, logout);

export default router;
