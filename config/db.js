const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    // prevent multiple connections (useful for Vercel / serverless)
    if (mongoose.connection.readyState >= 1) {
      console.log("ℹ️ MongoDB already connected");
      return;
    }

    await mongoose.connect(process.env.MONGO_URI, {
      // optional: dbName set pannalaam if not in URI
      // dbName: "portfolio",
    });

    console.log("🔥 MongoDB connected (Vercel)");
  } catch (error) {
    console.error("❌ MongoDB connection error:", error.message);
  }
};

module.exports = connectDB;
