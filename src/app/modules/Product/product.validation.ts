import { z } from 'zod';

export const createProductSchema = z.object({
  body: z.object({
    name: z.string({ required_error: 'Name is required' }),
    description: z.string().optional(),
    price: z.number({ required_error: 'Price is required' }).nonnegative('Price must be >= 0'),
    stock: z.number({ required_error: 'Stock is required' }).int().nonnegative('Stock must be >= 0'),
  }),
});


export const ProductValidation = {
    createProductSchema
}