import express from "express";

import {
  getAllUsers,
  getUser,
  deleteUserAdmin,
  updateUserAdmin,
  updateMyPassword,
  updateMe,
} from "../controllers/userController.mjs";
import {
  isAuthenticated,
  authorizedTo,
} from "../middlewares/authMiddleware.js";
import ticketRoutes from "./ticketRoutes.mjs";

const router = express.Router();

router.use("/:userId/tickets", isAuthenticated, ticketRoutes);

router
  .route("/")
  .get(isAuthenticated, authorizedTo("admin", "superadmin"), getAllUsers);

router
  .route("/:id")
  .get(isAuthenticated, authorizedTo("agent", "admin", "superadmin"), getUser)
  .patch(isAuthenticated, authorizedTo("admin", "superadmin"), updateUserAdmin)
  .delete(
    isAuthenticated,
    authorizedTo("admin", "superadmin"),
    deleteUserAdmin
  );

router.route("/me/password").patch(isAuthenticated, updateMyPassword);
router.route("/me/update").patch(isAuthenticated, updateMe);

export default router;
