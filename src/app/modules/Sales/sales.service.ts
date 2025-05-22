import { ISale } from "./sales.interface";
import { Sale } from "./sales.model";


export const createSale = async (payload:ISale) => {

  // Validate product exists
  const product = await Product.findById(productId);
  if (!product) throw new Error('Product not found');

  if (quantity > product.stock) {
    throw new Error('Quantity exceeds available stock');
  }

  // Reduce stock
  product.stock -= quantity;
  if (product.stock <= 0) {
    await product.remove(); // remove product if stock zero or less
  } else {
    await product.save();
  }

  // Create sale record
  const sale = await Sale.create(payload);

  return sale;
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