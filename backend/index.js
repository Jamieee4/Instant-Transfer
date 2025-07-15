const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("dotenv").config();

const connectDB = require("./db"); // assuming it connects to MongoDB
const router = require("./routes/index");

const app = express();

// Connect DB
connectDB();

// Middlewares
app.use(cors({
  origin: "http://localhost:5173", // for local frontend
  credentials: true,
}));
app.use(express.json());
app.use(cookieParser());

// Mount routes
app.use("/api/v1", router);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
