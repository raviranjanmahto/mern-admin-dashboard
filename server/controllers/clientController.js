const Product = require("../models/productModel");
const Transaction = require("../models/transactionModel");
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

exports.getTransactions = catchAsync(async (req, res) => {
  const { page = 1, pageSize = 20, sort = null, search = "" } = req.query;

  const generateSort = () => {
    const sortParsed = JSON.parse(sort);
    const sortFormatted = {
      [sortParsed.field]: (sortParsed.sort = "asc" ? 1 : -1),
    };
    return sortFormatted;
  };
  const sortFormatted = Boolean(sort) ? generateSort() : {};

  const transactions = await Transaction.find({
    $or: [
      { cost: { $regex: new RegExp(search, "i") } },
      { userId: { $regex: new RegExp(search, "i") } },
    ],
  })
    .sort(sortFormatted)
    .skip(page * pageSize)
    .limit(pageSize);

  const total = await Transaction.countDocuments({});

  res.status(200).json({ status: "success", total, transactions });
});

exports.getGeography = catchAsync(async (req, res) => {
  const user = await User.find({});
  res.status(200).json({ status: "success", customers });
});
