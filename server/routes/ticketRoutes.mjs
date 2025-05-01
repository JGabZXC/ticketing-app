import express from "express";
import {
  getAllTickets,
  getTicket,
  updateTicket,
  postTicket,
} from "../controllers/ticketController.mjs";
import {
  isAuthenticated,
  authorizedTo,
} from "../middlewares/authMiddleware.js";

const router = express.Router({ mergeParams: true });

router
  .route("/")
  .get(getAllTickets)
  .post(isAuthenticated, authorizedTo("user"), postTicket);

router
  .route("/:id")
  .get(isAuthenticated, getTicket)
  .patch(isAuthenticated, updateTicket);

export default router;
