import express from "express";
import { register, login } from "../controllers/authController.mjs";

const router = express.Router();

router.route("/login").post(login);
router.route("/register").post(register);

export default router;
