const express = require("express");
const Contact = require("../models/Contact");

const router = express.Router();

// POST /api/contact - save message
router.post("/", async (req, res) => {
  try {
    console.log("📩 New contact request body:", req.body);

    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }

    const contact = await Contact.create({ name, email, message });

    res.status(201).json({
      success: true,
      message: "Message received",
      data: contact,
    });
  } catch (error) {
    console.error("❌ Contact error:", error);

    res
      .status(500)
      .json({ success: false, message: error.message || "Server error" });
  }
});

// GET /api/contact - list all messages (for later)
router.get("/", async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.json({ success: true, data: contacts });
  } catch (error) {
    console.error("❌ Get contacts error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

module.exports = router;
