const User = require("../models/userModel");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");

exports.getUser = catchAsync(async (req, res, next) => {
  const user = await User.findOne({ _id: req.params.id });
  if (!user)
    return next(new AppError(`There was not user with: ${req.params.id}`, 400));
  res.status(200).json({ status: "success", user });
});
