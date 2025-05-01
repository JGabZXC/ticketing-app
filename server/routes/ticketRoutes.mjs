import express from "express";
import { getAllTickets, postTicket } from "../controllers/ticketController.mjs";
import {
  isAuthenticated,
  authorizedTo,
} from "../middlewares/authMiddleware.js";

const router = express.Router();

router
  .route("/")
  .get(getAllTickets)
  .post(isAuthenticated, authorizedTo("user"), postTicket);

export default router;
