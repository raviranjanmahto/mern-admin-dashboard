const OverallStat = require("../models/overallStatModel");
const Transaction = require("../models/transactionModel");
const User = require("../models/userModel");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");

exports.getUser = catchAsync(async (req, res, next) => {
  const user = await User.findOne({ _id: req.params.id });
  if (!user)
    return next(new AppError(`There was not user with: ${req.params.id}`, 400));
  res.status(200).json({ status: "success", user });
});

exports.getDashboardStats = catchAsync(async (req, res, next) => {
  // Hardcoded values needs change later
  const currentMonth = "November";
  const currentYear = 2021;
  const currentDay = "2021-11-12";

  // Recent Transactions
  const transactions = await Transaction.find()
    .limit(50)
    .sort({ createdOn: -1 });

  // Overall Stats
  const overallStat = await OverallStat.find({ year: currentYear });

  const {
    totalCustomers,
    yearlyTotalSoldUnits,
    yearlySalesTotal,
    monthlyData,
    salesByCategory,
  } = overallStat[0];

  const thisMonthStats = overallStat[0].monthlyData.find(({ month }) => {
    return month === currentMonth;
  });

  const todayStats = overallStat[0].dailyData.find(({ date }) => {
    return date === currentDay;
  });

  res.status(200).json({
    status: "success",
    totalCustomers,
    yearlyTotalSoldUnits,
    yearlySalesTotal,
    monthlyData,
    salesByCategory,
    thisMonthStats,
    todayStats,
    transactions,
  });
});
