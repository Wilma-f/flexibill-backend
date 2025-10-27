import express from "express";
import Invoice from "../models/invoice.js";


const router = express.Router();

// ✅ Get all invoices
router.get("/", async (req, res) => {
  try {
    const invoices = await Invoice.find();
    res.json(invoices);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch invoices" });
  }
});

// ✅ Add new invoice
router.post("/", async (req, res) => {
  try {
    const invoice = new Invoice(req.body);
    await invoice.save();
    res.status(201).json(invoice);
  } catch (error) {
    res.status(400).json({ message: "Failed to add invoice" });
  }
});

// ✅ Update invoice
router.put("/:id", async (req, res) => {
  try {
    const updated = await Invoice.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (error) {
    res.status(400).json({ message: "Failed to update invoice" });
  }
});

// ✅ Delete invoice
router.delete("/:id", async (req, res) => {
  try {
    await Invoice.findByIdAndDelete(req.params.id);
    res.json({ message: "Invoice deleted" });
  } catch (error) {
    res.status(400).json({ message: "Failed to delete invoice" });
  }
});

export default router;
