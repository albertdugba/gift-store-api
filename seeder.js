const fs = require("fs");
const mongoose = require("mongoose");

const colors = require("colors");
const dotenv = require("dotenv");

dotenv.config({ path: "./config/config.env" });

// load models
const Product = require("./models/Product");

// connect to database
mongoose.connect(process.env.MONGO_URI, {
  useFindAndModify: false,
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

// read json files
const products = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/products.json`, "utf-8"),
);

// import into database
const importData = async () => {
  try {
    await Product.create(products);
    console.log(`Data imported`.green.inverse);
    process.exit();
  } catch (error) {
    console.error(error);
  }
};

// destroy from database
const deleteData = async () => {
  try {
    await Product.deleteMany();
    console.log(`Data destroyed`.red.inverse);
  } catch (error) {
    console.error(error);
  }
};

if (process.argv[2] === "-i") {
  importData();
} else if (process.argv[2] === "-d") {
  deleteData();
}
