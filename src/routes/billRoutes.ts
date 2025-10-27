import express from "express";
import Bill from "../models/Bill.js";
import { protect } from "../middleware/authMiddleware.js";
import type { AuthRequest } from "../middleware/authMiddleware.js";


const router = express.Router();

// Get all bills for user
router.get("/", protect, async (req: AuthRequest, res) => {
  const bills = await Bill.find({ userId: req.userId });
  res.json(bills);
});

// Add a new bill
router.post("/", protect, async (req: AuthRequest, res) => {
  const { title, amount, dueDate } = req.body;
  const bill = await Bill.create({ userId: req.userId, title, amount, dueDate });
  res.json(bill);
});

// Edit a bill
router.put("/:id", protect, async (req: AuthRequest, res) => {
  const bill = await Bill.findOneAndUpdate({ _id: req.params.id, userId: req.userId }, req.body, { new: true });
  res.json(bill);
});

// Delete a bill
router.delete("/:id", protect, async (req: AuthRequest, res) => {
  await Bill.findOneAndDelete({ _id: req.params.id, userId: req.userId });
  res.json({ message: "Bill deleted" });
});

export default router;
