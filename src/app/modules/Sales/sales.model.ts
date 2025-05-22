import mongoose, { Schema, Document } from 'mongoose';


export interface ISaleDocument extends Document {
  productId: mongoose.Types.ObjectId;
  quantity: number;
  buyerName: string;
  saleDate: Date;
}

const SaleSchema = new Schema<ISaleDocument>({
  productId: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
  quantity: { type: Number, required: true, min: 1 },
  buyerName: { type: String, required: true },
  saleDate: { type: Date, required: true },
});

export const Sale = mongoose.model<ISaleDocument>('Sale', SaleSchema);
