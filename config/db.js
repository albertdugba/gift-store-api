const mongoose = require("mongoose");

const connectDD = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    });
    console.log(
      `Database connected on ${conn.connection.host}`.cyan.underline.bold,
    );
  } catch (error) {
    console.log("Something went wrong", error);
  }
};

module.exports = connectDD;
