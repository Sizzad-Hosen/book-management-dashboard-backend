import mongoose from "mongoose";

export interface ISale {

  productId: mongoose.Types.ObjectId; 
  quantity: number;
  buyerName: string;
  saleDate: Date;
  
}

