import mongoose from "mongoose";

interface IBill extends mongoose.Document {
  userId: mongoose.Types.ObjectId; 
  title: string;
  amount: number;
  dueDate: Date;
  status: string; // paid / unpaid
}

const billSchema = new mongoose.Schema<IBill>({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  title: { type: String, required: true },
  amount: { type: Number, required: true },
  dueDate: { type: Date, required: true },
  status: { type: String, default: "unpaid" },
});

export default mongoose.model<IBill>("Bill", billSchema);
