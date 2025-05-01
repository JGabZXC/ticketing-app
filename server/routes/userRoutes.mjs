import express from "express";

import {
  getAllUsers,
  getUser,
  updateUserAdmin,
} from "../controllers/userController.mjs";
import {
  isAuthenticated,
  authorizedTo,
} from "../middlewares/authMiddleware.js";
import ticketRoutes from "./ticketRoutes.mjs";

const router = express.Router();

router.use("/:userId/tickets", ticketRoutes);

router
  .route("/")
  .get(isAuthenticated, authorizedTo("admin", "superadmin"), getAllUsers);

router
  .route("/:id")
  .get(isAuthenticated, authorizedTo("agent", "admin", "superadmin"), getUser)
  .patch(isAuthenticated, authorizedTo("admin", "superadmin"), updateUserAdmin);

export default router;
