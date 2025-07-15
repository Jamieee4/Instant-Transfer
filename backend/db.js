require("dotenv").config();
const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to DB successfully!!!");
  } catch (err) {
    console.error("Database connection error:", err);
  }
};

module.exports = connectDB;
