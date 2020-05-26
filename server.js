const express = require("express");
const dotenv = require("dotenv");

// route file
const products = require("./routes/products");

// load .env variables
dotenv.config({ path: "./config/config.env" });

const app = express();

// mount routers
app.use("/api/v1/products", products);

const PORT = process.env.PORT || 8000;

app.listen(PORT, () =>
  console.log(
    `Server started listenig on port ${PORT} in ${process.env.NODE_ENV} mode`,
  ),
);
