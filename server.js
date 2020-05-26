const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const colors = require("colors");
const connectDB = require("./config/db");

// route file
const products = require("./routes/products");
const logger = require("./middleware/logger");

// load .env variables
dotenv.config({ path: "./config/config.env" });
connectDB();

const app = express();

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// app.use(logger);

// mount routers
app.use("/api/v1/products", products);

const PORT = process.env.PORT || 8000;

const server = app.listen(PORT, () =>
  console.log(
    `Server started listenig in ${process.env.NODE_ENV} mode on ${PORT}`.yellow
      .bold,
  ),
);

// UnhandledRejection
process.on("unHandledRejection", (error, promise) => {
  console.log(`UnHandled Rejection: ${error.message}`);
  server.close(() => process.exit());
});
