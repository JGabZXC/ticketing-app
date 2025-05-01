import Ticket from "../models/Ticket.js";
import catchAsync from "../utils/catchAsync.js";
import Features from "../utils/Features.js";
import AppError from "../utils/appError.js";

export const getAllTickets = catchAsync(async (req, res, next) => {
  const filter = {};
  if (req.params.userId) filter.createdBy = req.params.userId;

  const features = new Features(Ticket.find(filter), req.query).paginate();
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

export const getTicket = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const ticket = await Ticket.findById(id).populate({
    path: "createdBy",
    select: "username firstName lastName",
  });

  if (!ticket) return next(new AppError("No ticket found with that ID", 404));

  res.status(200).json({
    status: "success",
    data: {
      ticket,
    },
  });
});

export const updateTicket = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const ticket = await Ticket.findById(id);

  if (!ticket) return next(new AppError("No ticket found with that ID", 404));

  if (req.body.status) {
    if (req.user.role !== "agent")
      return next(
        new AppError("You are not authorized to perform this action", 403)
      );
    req.body.updatedAt = Date.now();
  }

  const updatedTicket = await Ticket.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    status: "success",
    data: {
      ticket: updatedTicket,
    },
  });
});

export const postTicket = catchAsync(async (req, res, next) => {
  req.body.createdBy = req.user.id;

  const newTicket = await Ticket.create(req.body);

  res.status(201).json({
    status: "success",
    data: {
      ticket: newTicket,
    },
  });
});
