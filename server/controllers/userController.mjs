import User from "../models/User.js";
import Ticket from "../models/Ticket.js";
import catchAsync from "../utils/catchAsync.js";
import Features from "../utils/Features.js";
import AppError from "../utils/appError.js";

export const getAllUsers = catchAsync(async (req, res, next) => {
  const features = new Features(User.find(), req.query).paginate();
  const query = features.query;
  const totalUsers = await User.countDocuments();
  const totalPages = Math.ceil(totalUsers / (req.query.limit || 20));

  const users = await query;

  res.status(200).json({
    status: "success",
    results: users.length,
    totalUsers,
    totalPages,
    data: {
      users,
    },
  });
});

export const getUser = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const user = await User.findById(id);

  if (!user) return next(new AppError("No user found with that ID", 404));

  res.status(200).json({
    status: "success",
    data: {
      user,
    },
  });
});

export const updateUserAdmin = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const user = await User.findById(id);

  if (!user) return next(new AppError("No user found with that ID", 404));

  if (req.body.role) {
    if (req.user.role !== "superadmin")
      return next(
        new AppError("You are not authorized to perform this action", 403)
      );
    user.role = req.body.role;
  }

  if (req.body.password || req.body.confirmPassword) {
    if (!req.body.confirmPassword)
      return next(new AppError("Please confirm your password", 400));
    user.password = req.body.password;
    user.confirmPassword = req.body.confirmPassword;
  }

  if (req.body.username) user.name = req.body.name;
  if (req.body.email) user.email = req.body.email;
  if (req.body.firstName) user.firstName = req.body.firstName;
  if (req.body.lastName) user.lastName = req.body.lastName;

  const updatedUser = await user.save({
    validateModifiedOnly: true,
  });

  res.status(200).json({
    status: "success",
    data: {
      user: updatedUser,
    },
  });
});

export const deleteUserAdmin = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const user = await User.findById(id);

  if (!user) return next(new AppError("No user found with that ID", 404));

  await user.remove();
  await Ticket.deleteMany({ createdBy: id });

  res.status(204).json({
    status: "success",
    data: null,
  });
});
