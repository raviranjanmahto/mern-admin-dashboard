const Product = require("../models/productModel");
const User = require("../models/userModel");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");

exports.getProducts = catchAsync(async (req, res) => {
  const products = await Product.find({});
  res.status(200).json({ status: "success", products });
});

exports.getCustomers = catchAsync(async (req, res) => {
  const customers = await User.find({ role: "user" });
  res.status(200).json({ status: "success", customers });
});
