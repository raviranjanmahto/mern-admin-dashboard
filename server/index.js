const dotenv = require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");

const AppError = require("./utils/appError");
const clientRoutes = require("./routes/clientRoute");
const generalRoutes = require("./routes/generalRoute");
const managementRoutes = require("./routes/managementRoute");
const salesRoutes = require("./routes/salesRoute");

// const errorGlobalMiddleware = require("./middlewares/errorMiddleware");

const app = express();
// Body parser, reading data from body into req.body
app.use(express.json({ limit: "10kb" }));

// Development logging
if (process.env.NODE_ENV === "development") app.use(morgan("dev"));

// // Serving static file
// app.use(express.static(path.join(__dirname, "public")));

// ROUTES
app.use("/api/v1/client", clientRoutes);
app.use("/api/v1/general", generalRoutes);
app.use("/api/v1/management", managementRoutes);
app.use("/api/v1/sales", salesRoutes);

app.all("*", (req, res, next) =>
  next(new AppError(`Can't find ${req.originalUrl} on this server`, 404))
);

// app.use(errorGlobalMiddleware);

mongoose
  .connect(process.env.DATABASE_URI)
  .then(() => console.log(`Database connected successful🥰💚🥰`))
  .catch(err => console.log(`ERROR🎇💣💣💣🎇=>`, err.message));

const port = process.env.PORT || 7008;
app.listen(port, () => console.log(`Server is listening on port ${port}...`));
