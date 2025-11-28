// api/contact.js  (in your server repo)
const connectDB = require("../config/db");
const Contact = require("../models/Contact");

module.exports = async (req, res) => {
  try {
    // Connect to MongoDB (once per cold start)
    await connectDB();

    const method = req.method;

    if (method === "POST") {
      const { name, email, message } = req.body || {};

      if (!name || !email || !message) {
        return res
          .status(400)
          .json({ success: false, message: "All fields are required" });
      }

      const contact = await Contact.create({ name, email, message });

      return res.status(201).json({
        success: true,
        message: "Message received",
        data: contact,
      });
    }

    if (method === "GET") {
      const contacts = await Contact.find().sort({ createdAt: -1 });
      return res.status(200).json({ success: true, data: contacts });
    }

    // Unsupported method
    return res
      .status(405)
      .json({ success: false, message: "Method Not Allowed" });
  } catch (error) {
    console.error("❌ /api/contact error:", error);
    return res
      .status(500)
      .json({ success: false, message: error.message || "Server error" });
  }
};
