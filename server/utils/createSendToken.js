import jwt from "jsonwebtoken";

function signToken(id) {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
}

export default function createSendToken(user, statusCode, res) {
  const token = signToken(user._id);

  /*
  Setting the cookie expiration need to be set here because the JWT_COOKIE_EXPIRES is undefined if outside, because the process.env is not available at the moment of the server start, but only when the server is running and the env variables are loaded, so when calling login route all of the modules are loaded same with env variables so the JWT_COOKIE_EXPIRES is now available

  try console logging the process.env.JWT_COOKIE_EXPIRES outside of this function and it will be undefined, but if you console log it inside the function it will be available because calling this function is inside the route handler and the env variables are loaded at that point

  NOTE: Every .env variable are not loaded at the start of the server
  */

  const cookieOptions = {
    httpOnly: true,
    secure: false,
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000
    ),
    sameSite: "Lax",
  };

  if (process.env.NODE_ENV === "production") {
    cookieOptions.secure = true;
    cookieOptions.sameSite = "None"; //'None' for cross-site cookies in production
  }

  res.cookie("jwt", token, cookieOptions);

  user.password = undefined; // Remove password from the response

  res.status(statusCode).json({
    status: "success",
    token,
    data: {
      user,
    },
  });
}
