import express from "express";
import Client from "../models/Client.js";
import Invoice from "../models/invoice.js";

const router = express.Router();

// GET all clients with invoice totals
router.get("/", async (req, res) => {
  try {
    const clients = await Client.find();
    const clientsWithTotals = await Promise.all(
      clients.map(async (client) => {
        const invoices = await Invoice.find({ client: client._id });
        const totalBilled = invoices.reduce((sum, inv) => sum + Number(inv.amount), 0);
        const outstandingBalance = invoices
          .filter((inv) => inv.status !== "Paid")
          .reduce((sum, inv) => sum + Number(inv.amount), 0);

        return {
          ...client.toObject(),
          totalBilled,
          outstandingBalance,
          invoices,
        };
      })
    );

    res.json(clientsWithTotals);
  } catch (err: unknown) {
    if (err instanceof Error) {
      res.status(500).json({ message: err.message });
    } else {
      res.status(500).json({ message: "Unknown error occurred" });
    }
  }
});

// POST add new client
router.post("/", async (req, res) => {
  try {
    const client = new Client(req.body);
    await client.save();
    res.status(201).json(client);
  } catch (err: unknown) {
    if (err instanceof Error) {
      res.status(400).json({ message: err.message });
    } else {
      res.status(400).json({ message: "Unknown error occurred" });
    }
  }
});

// PUT edit client
router.put("/:id", async (req, res) => {
  try {
    const client = await Client.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!client) return res.status(404).json({ message: "Client not found" });
    res.json(client);
  } catch (err: unknown) {
    if (err instanceof Error) {
      res.status(400).json({ message: err.message });
    } else {
      res.status(400).json({ message: "Unknown error occurred" });
    }
  }
});

// DELETE client
router.delete("/:id", async (req, res) => {
  try {
    const client = await Client.findByIdAndDelete(req.params.id);
    if (!client) return res.status(404).json({ message: "Client not found" });
    res.json({ message: "Client deleted" });
  } catch (err: unknown) {
    if (err instanceof Error) {
      res.status(400).json({ message: err.message });
    } else {
      res.status(400).json({ message: "Unknown error occurred" });
    }
  }
});

export default router;
