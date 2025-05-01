import express from "express";
import { getAllTickets, postTicket } from "../controllers/ticketController.mjs";
import { isAuthenticated } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.route("/").get(getAllTickets).post(isAuthenticated, postTicket);

export default router;
