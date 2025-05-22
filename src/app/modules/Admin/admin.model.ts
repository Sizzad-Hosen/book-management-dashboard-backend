import { Schema, model } from 'mongoose';
import { TAdmin } from './admin.interface';


const adminSchema = new Schema<TAdmin>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    address: { type: String, required: true },
    number: { type: String, required: true },
  },
  { timestamps: true }
);

export const Admin = model<TAdmin>('Admin', adminSchema);
