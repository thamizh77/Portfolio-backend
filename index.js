const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

dotenv.config();

const app = express();

// 🔹 Connect MongoDB
connectDB();

// 🔹 Middlewares
app.use(cors());              // allow all origins (localhost:5173 included)
app.use(express.json());      // parse JSON body

// 🔹 Test route
app.get("/", (req, res) => {
  res.send("Portfolio API running 🚀");
});

// 🔹 Contact routes
app.use("/api/contact", require("./routes/contactRoutes"));

// 🔹 Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
