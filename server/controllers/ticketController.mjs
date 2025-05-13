import Ticket from "../models/Ticket.js";
import catchAsync from "../utils/catchAsync.js";
import Features from "../utils/Features.js";
import AppError from "../utils/appError.js";
import { validateComment } from "../utils/validate.js";

export const getAllTickets = catchAsync(async (req, res, next) => {
  const filter = {};
  if (req.params.userId) filter.createdBy = req.params.userId;

  const features = new Features(Ticket.find(filter), req.query)
    .paginate()
    .sort();
  const query = features.query;
  const totalTickets = await Ticket.countDocuments(filter);
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
  const ticket = await Ticket.findById(id)
    .populate({
      path: "createdBy",
      select: "username firstName lastName",
    })
    .populate({
      path: "assignedTo",
      select: "username role firstName lastName",
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

  if (req.body.status || req.body.assignedTo) {
    if (req.user.role !== "agent")
      return next(
        new AppError("You are not authorized to perform this action", 403)
      );
  }

  req.body.updatedAt = Date.now();

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
  req.body.createdBy = req.user._id;

  const newTicket = await Ticket.create(req.body);

  res.status(201).json({
    status: "success",
    data: {
      ticket: newTicket,
    },
  });
});

export const deleteTicket = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const ticket = await Ticket.findById(id);

  if (!ticket) return next(new AppError("No ticket found with that ID", 404));

  await Ticket.findByIdAndDelete(id);

  res.status(204).json({
    status: "success",
    data: null,
  });
});

export const getComment = catchAsync(async (req, res, next) => {
  const { ticketId } = req.params;

  const ticket = await Ticket.findById(ticketId).populate({
    path: "comments.postedBy",
    select: "username firstName lastName",
  });

  if (!ticket) return next(new AppError("No ticket found with that ID", 404));

  res.status(200).json({
    status: "success",
    data: {
      comments: ticket.comments,
    },
  });
});

export const postComment = catchAsync(async (req, res, next) => {
  const { ticketId } = req.params;
  const { comment } = req.body;
  const ticket = await Ticket.findById(ticketId);

  if (!ticket) return next(new AppError("No ticket found with that ID", 404));
  if (!comment) return next(new AppError("Please provide a comment", 400));

  const errorComment = validateComment(comment);

  if (errorComment) return next(new AppError(errorComment, 400));

  ticket.comments.push({
    comment,
    postedBy: req.user._id,
  });

  await ticket.save();

  res.status(200).json({
    status: "success",
    data: {
      ticket,
    },
  });
});

export const deleteComment = catchAsync(async (req, res, next) => {
  const { ticketId, commentId } = req.params;
  const ticket = await Ticket.findById(ticketId);

  if (!ticket) return next(new AppError("No ticket found with that ID", 404));

  if (!ticket.comments.id(commentId))
    return next(new AppError("No comment found with that ID", 404));

  const isAdmin = !req.user.role.includes("user");
  const isCommentOwner = req.user._id.equals(
    ticket.comments.id(commentId).postedBy
  );

  // if user is admin it will become true and then invert that to false making the condition to false and will exit the if statement, so does the isCommentOwner. If both are false then the condition will return false and then will be inverted to true making the condition met and will enter the if statement
  if (!(isAdmin || isCommentOwner))
    return next(
      new AppError("You are not authorized to perform this action", 403)
    );

  ticket.comments.pull({ _id: commentId });
  await ticket.save();

  return res.status(200).json({
    status: "success",
    data: {
      ticket,
    },
  });
});

export const getPriority = catchAsync(async (req, res, next) => {
  // Authenticated via middleware
  const { priority } = req.params;
  const page = +req.query.page || 1;
  const limit = +req.query.limit || 20;
  const skip = (page - 1) * limit;

  let sortVal = -1;
  if (req.query.sort === "createdAt") sortVal = 1;
  if (req.query.sort === "-createdAt") sortVal = -1;

  const result = await Ticket.aggregate([
    {
      $match: {
        createdBy: req.user._id,
        priority: priority,
      },
    },
    {
      $facet: {
        metadata: [
          { $count: "totalTickets" },
          {
            $addFields: {
              totalPages: {
                $ceil: { $divide: ["$totalTickets", limit] },
              },
            },
          },
        ],
        data: [
          { $skip: skip },
          { $limit: limit },
          { $sort: { createdAt: sortVal } },
        ],
      },
    },
  ]);

  const metadata = result[0].metadata[0] || { totalTickets: 0, totalPages: 0 };
  const tickets = result[0].data;

  res.status(200).json({
    status: "success",
    totalTickets: metadata.totalTickets,
    totalPages: metadata.totalPages,
    data: {
      tickets,
    },
  });
});
