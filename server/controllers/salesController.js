const OverallStat = require("../models/overallStatModel");
const catchAsync = require("../utils/catchAsync");

exports.getSales = catchAsync(async (req, res) => {
  const overallStats = await OverallStat.find();
  res.status(200).json({ status: "success", overallStats: overallStats[0] });
});
