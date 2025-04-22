const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const MAX_RETRIES = process.env.MAX_RETRIES ||  5;
let retryCount = 0;

const connectToDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("✅ MongoDB Connected Successfully");
    retryCount = 0; 
  } catch (err) {
    retryCount++;
    console.error(
      `❌ Database connection failed (Attempt ${retryCount}/${MAX_RETRIES})\n${err.message}`
    );

    if (retryCount >= MAX_RETRIES) {
      console.error("💥 Max retries reached. Exiting process.");
      process.exit(1); 
    }

    const delay = Math.min(5000 * retryCount, 30000); 
    console.log(`🔁 Retrying connection in ${delay / 1000} seconds...`);
    setTimeout(connectToDatabase, delay);
  }
};

module.exports = connectToDatabase;
