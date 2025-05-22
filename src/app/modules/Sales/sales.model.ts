import mongoose, { Schema } from 'mongoose';
import { ISale } from './sales.interface';



const SaleSchema = new Schema<ISale>({
  productId: { type: Schema.Types.ObjectId, ref: 'Product' },
  quantity: { type: Number, required: true, min: 1 },
  buyerName: { type: String, required: true },
  saleDate: { type: Date, required: true },
});

export const Sale = mongoose.model<ISale>('Sale', SaleSchema);
