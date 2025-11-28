const connectDB = require("../config/db");
const Contact = require("../models/Contact");

module.exports = async (req, res) => {
  try {
    // CORS / preflight support (optional but safe)
    if (req.method === "OPTIONS") {
      return res.status(200).end();
    }

    // Ensure DB connection
    await connectDB();

    if (req.method === "POST") {
      const { name, email, message } = req.body || {};

      if (!name || !email || !message) {
        return res.status(400).json({
          success: false,
          message: "All fields are required",
        });
      }

      const saved = await Contact.create({ name, email, message });

      return res.status(201).json({
        success: true,
        message: "Message received",
        data: saved,
      });
    }

    if (req.method === "GET") {
      const contacts = await Contact.find().sort({ createdAt: -1 });
      return res.status(200).json({ success: true, data: contacts });
    }

    // Other HTTP methods not allowed
    return res
      .status(405)
      .json({ success: false, message: "Method not allowed" });
  } catch (error) {
    console.error("❌ /api/contact error:", error);
    return res
      .status(500)
      .json({ success: false, message: error.message || "Server error" });
  }
};
