import express from "express";

import {
  getAllUsers,
  updateUserAdmin,
} from "../controllers/userController.mjs";
import {
  isAuthenticated,
  authorizedTo,
} from "../middlewares/authMiddleware.js";

const router = express.Router();

router
  .route("/")
  .get(isAuthenticated, authorizedTo("admin", "superadmin"), getAllUsers);

router
  .route("/:id")
  .patch(isAuthenticated, authorizedTo("admin", "superadmin"), updateUserAdmin);

export default router;
