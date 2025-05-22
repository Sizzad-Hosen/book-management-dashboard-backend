import { z } from 'zod';

export const createAdminZodSchema = z.object({
  body: z.object({
    name: z.string({ required_error: 'Name is required' }),
    email: z.string({ required_error: 'Email is required' }).email(),
    address: z.string({ required_error: 'Address is required' }),
    number: z.string({ required_error: 'Number is required' }),
  }),
});


export const AdminValidation = {
    createAdminZodSchema
}