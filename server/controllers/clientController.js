const getCountryISO3 = require("country-iso-2-to-3");

const Product = require("../models/productModel");
const Transaction = require("../models/transactionModel");
const User = require("../models/userModel");
const catchAsync = require("../utils/catchAsync");
const ProductStat = require("../models/productStatModel");

exports.getProducts = catchAsync(async (req, res) => {
  const products = await Product.find();

  const productsWithStats = await Promise.all(
    products.map(async product => {
      const stat = await ProductStat.find({
        productId: product._id,
      });
      return {
        ...product._doc,
        stat,
      };
    })
  );
  res.status(200).json({ status: "success", productsWithStats });
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
  const users = await User.find({});

  const mappedLocations = users.reduce((acc, { country }) => {
    const countryISO3 = getCountryISO3(country);
    if (!acc[countryISO3]) acc[countryISO3] = 0;
    acc[countryISO3]++;
    return acc;
  }, {});

  const formattedLocations = Object.entries(mappedLocations).map(
    ([country, count]) => {
      return { id: country, value: count };
    }
  );

  res.status(200).json({ status: "success", formattedLocations });
});
