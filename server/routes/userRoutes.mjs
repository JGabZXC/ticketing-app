import express from "express";

import {
  getAllUsers,
  updateUserAdmin,
} from "../controllers/userController.mjs";
import {
  isAuthenticated,
  authorizedTo,
} from "../middlewares/authMiddleware.js";
import ticketRoutes from "./ticketRoutes.mjs";

const router = express.Router();

router.use("/:userId/", ticketRoutes);

router
  .route("/")
  .get(isAuthenticated, authorizedTo("admin", "superadmin"), getAllUsers);

router
  .route("/:id")
  .get(
    isAuthenticated,
    authorizedTo("agent", "admin", "superadmin"),
    getAllUsers
  )
  .patch(isAuthenticated, authorizedTo("admin", "superadmin"), updateUserAdmin);

export default router;
