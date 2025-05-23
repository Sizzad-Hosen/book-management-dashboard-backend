import { z } from 'zod';

// const isValidObjectId = (id: string) => mongoose.Types.ObjectId.isValid(id);

export const createSaleZodSchema = z.object({
  body: z.object({
    productId: z.string({ required_error: 'Product ID is required' }),
    quantity: z.number({ required_error: 'Quantity is required' }).min(1),
    buyerName: z.string({ required_error: 'Buyer name is required' }),
    saleDate: z.coerce.date({ required_error: 'Sale date is required' }),
  }),
});


export const SalesValidation = {
  createSaleZodSchema,
};
