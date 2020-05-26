const mongoose = require("mongoose");

const connectDD = async () => {
  const conn = await mongoose.connect(process.env.MONGO_URI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  });
  console.log(`Database connected on ${conn.connection.host}`);
};

module.exports = connectDD;
