const dotenv = require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const cors = require("cors");
const path = require("path");

const AppError = require("./utils/appError");
const clientRoutes = require("./routes/clientRoute");
const generalRoutes = require("./routes/generalRoute");
const managementRoutes = require("./routes/managementRoute");
const salesRoutes = require("./routes/salesRoute");

const errorGlobalMiddleware = require("./middlewares/errorMiddleware");

// data imports
// const { dataUser, dataProduct, dataProductStat } = require("./data");
// const User = require("./models/userModel");
// const Product = require("./models/productModel");
// const ProductStat = require("./models/productStatModel");

const app = express();
// Body parser, reading data from body into req.body
app.use(express.json({ limit: "10kb" }));
app.use(cors());

// Development logging
if (process.env.NODE_ENV === "development") app.use(morgan("dev"));

// Serving static file
app.use(express.static(path.join(__dirname, "dist")));

// ROUTES
app.use("/api/v1/client", clientRoutes);
app.use("/api/v1/general", generalRoutes);
app.use("/api/v1/management", managementRoutes);
app.use("/api/v1/sales", salesRoutes);

app.all("*", (req, res, next) =>
  next(new AppError(`Can't find ${req.originalUrl} on this server`, 404))
);

app.use(errorGlobalMiddleware);

mongoose
  .connect(process.env.DATABASE_URI)
  .then(() => {
    console.log(`Database connected successful🥰💚🥰`);
    // Data imports ONE time only
    // User.insertMany(dataUser);
    // Product.insertMany(dataProduct);
    // ProductStat.insertMany(dataProductStat);
  })
  .catch(err => console.log(`ERROR🎇💣💣💣🎇=>`, err.message));

const port = process.env.PORT || 7008;
app.listen(port, () => console.log(`Server is listening on port ${port}...`));
