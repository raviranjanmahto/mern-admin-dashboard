const { default: mongoose } = require("mongoose");
const User = require("../models/userModel");
const catchAsync = require("../utils/catchAsync");
const Transaction = require("../models/transactionModel");

exports.getAdmins = catchAsync(async (req, res, next) => {
  const admins = await User.find({ role: "admin" });
  res.status(200).json({ status: "success", admins });
});
exports.getUserPerformance = catchAsync(async (req, res, next) => {
  const userWithStats = await User.aggregate([
    {
      $match: {
        _id: new mongoose.Types.ObjectId(req.params.id),
      },
    },
    {
      $lookup: {
        from: "affiliatestats",
        localField: "_id",
        foreignField: "userId",
        as: "affiliateStats",
      },
    },
    {
      $unwind: "$affiliateStats",
    },
  ]);

  const saleTransactions = await Promise.all(
    userWithStats[0].affiliateStats.affiliateSales.map(id => {
      return Transaction.findById(id);
    })
  );
  const filteredSaleTransactions = saleTransactions.filter(
    transaction => transaction !== null
  );
  res.status(200).json({
    status: "success",
    user: userWithStats[0],
    sales: filteredSaleTransactions,
  });
});
