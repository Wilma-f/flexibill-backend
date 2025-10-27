import mongoose from 'mongoose';

const clientSchema = new mongoose.Schema({
  name: { type: String, required: true },
  company: { type: String },
  email: { type: String },
  phone: { type: String },
  address: { type: String },
});

export default mongoose.model('Client', clientSchema);
