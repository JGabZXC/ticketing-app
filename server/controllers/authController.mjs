import User from "../models/User.js";
import AppError from "../utils/appError.js";
import catchAsync from "../utils/catchAsync.js";
import createSendToken from "../utils/createSendToken.js";
import {
  validateEmail,
  validateFirstName,
  validateUsername,
  validateLastName,
  validatePassword,
  validateConfirmPassword,
} from "../utils/validate.js";

export const logout = catchAsync(async (req, res, next) => {
  res.clearCookie("jwt");
  res.status(200).json({
    status: "success",
    message: "Logged out successfully",
  });
});

export const login = catchAsync(async (req, res, next) => {
  const { username, password } = req.body;

  const user = await User.findOne({
    $or: [{ username }, { email: username }],
  }).select("+password");

  if (!user) return next(new AppError("No account was found", 401));

  if (!(await user.checkPassword(password, user.password)))
    return next(new AppError("Invalid username or password", 401));

  await User.updateOne({ _id: user._id }, { validTokenDate: new Date() });
  createSendToken(user, 200, res);
});

export const register = catchAsync(async (req, res, next) => {
  const { username, email, firstName, lastName, password, confirmPassword } =
    req.body;

  let errors = {};

  console.log(req.body);

  if (validateUsername(username)) errors.username = validateUsername(username);
  if (validateEmail(email)) errors.email = validateEmail(email);
  if (validateFirstName(firstName))
    errors.firstName = validateFirstName(firstName);
  if (validateLastName(lastName)) errors.lastName = validateLastName(lastName);
  if (validatePassword(password)) errors.password = validatePassword(password);
  if (validateConfirmPassword(password, confirmPassword))
    errors.confirmPassword = validateConfirmPassword(password, confirmPassword);

  console.log(errors);

  if (Object.keys(errors).length > 0) {
    return res.status(400).json({
      status: "fail",
      message: "validation error",
      errors: errors,
      data: [],
    });
  }

  const finalFirstName = firstName[0].toUpperCase() + firstName.slice(1);
  const finalLastName = lastName[0].toUpperCase() + lastName.slice(1);

  const user = await User.create({
    username,
    email,
    firstName: finalFirstName,
    lastName: finalLastName,
    password,
    confirmPassword,
  });

  return res.status(200).json({
    status: "success",
    data: user,
  });
});

// For react
export const getMe = catchAsync(async (req, res, next) => {
  res.status(200).json({
    status: "success",
    data: { user: req.user },
  });
});
