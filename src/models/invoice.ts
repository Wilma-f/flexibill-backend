import mongoose, { Schema, Document } from "mongoose";

export interface IInvoice extends Document {
  clientId: mongoose.Types.ObjectId; // Link to a Client
  amount: number;                    // Use number instead of string for calculations
  date: Date;
  status: "Pending" | "Paid" | "Overdue";
}

const invoiceSchema = new Schema<IInvoice>({
  clientId: { type: Schema.Types.ObjectId, ref: "Client", required: true },
  amount: { type: Number, required: true },
  date: { type: Date, required: true },
  status: {
    type: String,
    enum: ["Pending", "Paid", "Overdue"],
    default: "Pending",
  },
});

export default mongoose.model<IInvoice>("Invoice", invoiceSchema);
