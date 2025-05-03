import jwt from "jsonwebtoken";

function signToken(id) {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
}

export default function createSendToken(user, statusCode, res) {
  const token = signToken(user._id);

  user.password = undefined; // Remove password from the response

  res.status(statusCode).json({
    status: "success",
    token,
    data: {
      user,
    },
  });
}
