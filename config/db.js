const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    // prevent multiple connections
    if (mongoose.connection.readyState >= 1) return;

    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("🔥 MongoDB connected (Vercel)");
  } catch (error) {
    console.error("❌ MongoDB connection error:", error.message);
  }
};

module.exports = connectDB;
