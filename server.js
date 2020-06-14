const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const colors = require("colors");
const connectDB = require("./config/db");

// route file
const products = require("./routes/products");
const auth = require("./routes/auth");
const errorHandler = require("./middleware/error");

// load .env variables
dotenv.config({ path: "./config/config.env" });
connectDB();

const app = express();

app.use(express.json());
app.use(cookieParser());

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// app.use(logger);

// mount routers
app.use("/api/v1/products", products);
app.use("/api/v1/auth", auth);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () =>
  console.log(
    `Server started listenig in ${process.env.NODE_ENV} mode on ${PORT}`.yellow
      .bold,
  ),
);

// UnhandledRejection
process.on("UnhandledPromiseRejection", (error, promise) => {
  console.log(`UnHandled Rejection: ${error.message}`.red.bold);
  server.close(() => process.exit());
});
