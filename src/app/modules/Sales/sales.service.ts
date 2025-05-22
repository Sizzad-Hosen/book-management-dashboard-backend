import mongoose from "mongoose";
import AppError from "../../config/errors/AppError";
import { Product } from "../Product/product.model";
import { ISale } from "./sales.interface";
import { Sale } from "./sales.model";

import httpStatus from 'http-status';


export const createSale = async (payload: ISale) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    console.log('Create Sale Payload:', payload); // 🔍

    const product = await Product.findById(payload.productId).session(session);
    if (!product) {
      throw new AppError(httpStatus.NOT_FOUND, 'Product not found');
    }

    if (payload.quantity > product.stock) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Quantity exceeds available stock');
    }

    product.stock -= payload.quantity;

    if (product.stock <= 0) {
      await product.deleteOne({ session });
    } else {
      await product.save({ session });
    }

    const sale = await Sale.create([payload], { session });

    await session.commitTransaction();
    session.endSession();

    return sale[0];
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    console.error('Sale creation failed:', error); // 🔥
    throw error;
  }
};

export const getSalesHistory = async (period: 'daily' | 'weekly' | 'monthly' | 'yearly') => {
  const now = new Date();
  let startDate: Date;

  switch (period) {
    case 'daily':
      startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      break;
    case 'weekly':
      const day = now.getDay();
      startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate() - day);
      break;
    case 'monthly':
      startDate = new Date(now.getFullYear(), now.getMonth(), 1);
      break;
    case 'yearly':
      startDate = new Date(now.getFullYear(), 0, 1);
      break;
    default:
      throw new Error('Invalid period');
  }

  return Sale.find({ saleDate: { $gte: startDate } }).populate('productId');
};


export const SalesServices = {
    createSale,
    getSalesHistory
}