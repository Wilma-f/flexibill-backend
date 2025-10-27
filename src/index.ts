/*import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT ?? 5000;
const MONGO_URI = process.env.MONGO_URI ?? "";

app.get("/", (req, res) => {
  res.json({ status: "ok", time: new Date().toISOString() });
});

async function start() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("✅ Connected to MongoDB");
    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error("❌ Failed to start:", err);
    process.exit(1);
  }
}

start();
*/

// src/index.ts

import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";

import connectDB from "./config/db.js"; // MongoDB connection function
import authRoutes from "./routes/authRoutes.js";
import billRoutes from "./routes/billRoutes.js";
import invoiceRoutes from "./routes/invoiceRoutes.js";


const app = express();
app.use(cors());
app.use(express.json());


const PORT = process.env.PORT ?? 5000;

// Root route for quick test
app.get("/", (req, res) => {
  res.json({ status: "ok", time: new Date().toISOString() });
});

// Use routes
app.use("/api/auth", authRoutes);
app.use("/api/bills", billRoutes);
app.use("/api/invoice", invoiceRoutes);

// Start server with try/catch
async function startServer() {
  try {
    await connectDB(); // Connect to MongoDB
    console.log("✅ MongoDB connected");

    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error("❌ Failed to start server:", err);
    process.exit(1); // Stop process if DB connection fails
  }
}

startServer();
