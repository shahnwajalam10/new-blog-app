const mongoose = require("mongoose");
require("dotenv").config(); 

const MONGO_URI = process.env.MONGO_URI;

const connectDb = async () => {
  try {
    const connection = await mongoose.connect(MONGO_URI);
    if (connection) {
      console.log("Database Connected");
    }
  } catch (error) {
    console.error("Database connection failed:", error.message);
  }
};

module.exports = { connectDb };
