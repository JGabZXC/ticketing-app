import express from "express";
import {
  getAllTickets,
  getTicket,
  updateTicket,
  postTicket,
  deleteTicket,
  getComment,
  postComment,
  deleteComment,
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
  .patch(isAuthenticated, updateTicket)
  .delete(isAuthenticated, authorizedTo("admin", "superadmin"), deleteTicket);

router
  .route("/:ticketId/comment")
  .get(isAuthenticated, getComment)
  .post(isAuthenticated, postComment);

router
  .route("/:ticketId/delete/:commentId")
  .delete(isAuthenticated, deleteComment);

export default router;
