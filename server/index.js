const dotenv = require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
// const morgan = require("morgan");
const path = require("path");

const { rateLimit } = require("express-rate-limit");
const mongoSanitize = require("express-mongo-sanitize");
const compression = require("compression");
const helmet = require("helmet");

const AppError = require("./utils/appError");
const clientRoutes = require("./routes/clientRoute");
const generalRoutes = require("./routes/generalRoute");
const managementRoutes = require("./routes/managementRoute");
const salesRoutes = require("./routes/salesRoute");

const errorGlobalMiddleware = require("./middlewares/errorMiddleware");

const app = express();

// Limit request from same API
const apiLimiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: {
    status: "fail",
    message: "Too amy request from this IP, please try again in a hour",
  },
});

app.use("/api", apiLimiter);
app.use(mongoSanitize());
app.use(compression());
// Set security HTTP headers
app.use(helmet());

// Body parser, reading data from body into req.body
app.use(express.json({ limit: "10kb" }));

// Development logging
// if (process.env.NODE_ENV === "development") app.use(morgan("dev"));

// Serving static file
app.use(express.static(path.join(__dirname, "dist")));

// ROUTES
app.use("/api/v1/client", clientRoutes);
app.use("/api/v1/general", generalRoutes);
app.use("/api/v1/management", managementRoutes);
app.use("/api/v1/sales", salesRoutes);

// Serve the main HTML file for any client-side route
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

app.all("*", (req, res, next) =>
  next(new AppError(`Can't find ${req.originalUrl} on this server`, 404))
);

app.use(errorGlobalMiddleware);

mongoose
  .connect(process.env.DATABASE_URI)
  .then(() => {
    console.log(`Database connected successful🥰💚🥰`);
  })
  .catch(err => console.log(`ERROR🎇💣💣💣🎇=>`, err.message));

const port = process.env.PORT || 7008;
app.listen(port, () => console.log(`Server is listening on port ${port}...`));
