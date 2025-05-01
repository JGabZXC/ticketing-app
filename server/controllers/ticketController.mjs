import Ticket from "../models/Ticket.js";
import catchAsync from "../utils/catchAsync.js";
import Features from "../utils/Features.js";

export const getAllTickets = catchAsync(async (req, res, next) => {
  const features = new Features(Ticket.find(), req.query).paginate();
  const query = features.query;
  const totalTickets = await Ticket.countDocuments();
  const totalPages = Math.ceil(totalTickets / (req.query.limit || 20));

  const tickets = await query;

  res.status(200).json({
    status: "success",
    results: tickets.length,
    totalTickets,
    totalPages,
    data: {
      tickets,
    },
  });
});

export const postTicket = catchAsync(async (req, res, next) => {
  req.body.createdBy = req.user.id; // Assuming req.user is set by authentication middleware

  const newTicket = await Ticket.create(req.body);

  res.status(201).json({
    status: "success",
    data: {
      ticket: newTicket,
    },
  });
});
