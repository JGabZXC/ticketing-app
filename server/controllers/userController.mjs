import User from "../models/User.js";
import Ticket from "../models/Ticket.js";
import catchAsync from "../utils/catchAsync.js";
import Features from "../utils/Features.js";
import AppError from "../utils/appError.js";
import createSendToken from "../utils/createSendToken.js";

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

export const updateMyPassword = catchAsync(async (req, res, next) => {
  // This route already has the user object from the middleware
  const user = await User.findById(req.user._id).select("+password");

  const { currentPassword, password, confirmPassword } = req.body;

  if (!currentPassword || !password || !confirmPassword)
    return next(
      new AppError(
        "Please provide old password, new password and confirm password",
        400
      )
    );

  if (!(await user.checkPassword(currentPassword, user.password)))
    return next(new AppError("Current password is incorrect", 401));

  user.password = password;
  user.confirmPassword = confirmPassword;
  await user.save();

  createSendToken(user, 200, res);
});

export const updateMe = catchAsync(async (req, res, next) => {
  const excludedFields = [
    "password",
    "confirmPassword",
    "role",
    "validTokenDate",
    "passwordChangedAt",
  ];
  excludedFields.forEach((el) => delete req.body[el]);

  if (!req.body.email) delete req.body.email;
  if (!req.body.username) delete req.body.username;
  if (!req.body.firstName) delete req.body.firstName;
  if (!req.body.lastName) delete req.body.lastName;

  console.log(req.body);

  const user = await User.findByIdAndUpdate(req.user._id, req.body, {
    new: true,
    runValidators: true,
  });

  createSendToken(user, 200, res);
});
