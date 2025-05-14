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
  getPriority,
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
  .get(getTicket)
  .patch(isAuthenticated, updateTicket)
  .delete(isAuthenticated, authorizedTo("admin", "superadmin"), deleteTicket);

router
  .route("/:ticketId/comment")
  .get(isAuthenticated, getComment)
  .post(isAuthenticated, postComment);

router
  .route("/:ticketId/delete/:commentId")
  .delete(isAuthenticated, deleteComment);

router.route("/priority/:priority").get(isAuthenticated, getPriority);

export default router;
