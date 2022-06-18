// create Token and save in cookie

const sendToken = (user, req, res, statusCode) => {
  const token = user.getJWTToken();

  // option for cookies
  const options = {
    expires: new Date(
      Date.now() + process.env.COOKIE_EXPIRES * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };

  res.status(statusCode).cookie("token", token, options).json({
    success: true,
    user,
    token,
  });
};
module.exports = sendToken;
