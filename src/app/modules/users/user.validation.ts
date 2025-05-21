import { z } from 'zod';

const createUserZodSchema = z.object({
  body: z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string(),
    role: z.enum(['admin', 'user']),
    isDeleted: z.string().optional(),
  }),
})




export const UserValidation = {
    createUserZodSchema
}