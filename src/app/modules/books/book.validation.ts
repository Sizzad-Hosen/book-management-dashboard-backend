import { z } from "zod";

export const CreateBookValidationSchema = z.object({
body:z.object({


  title: z
    .string({
      required_error: "Title is required",
    })
    .min(2, "Title must be at least 2 characters"),

  author: z
    .string({
      required_error: "Author is required",
    })
    .min(1, "Author cannot be empty"),

  isbn: z
    .string()
    .regex(/^(\d{10}|\d{13})$/, "ISBN must be 10 or 13 digits")
    .optional(),

  genre: z.string().optional(),
  publisher: z.string().optional(),
  series: z.string().optional(),
  language: z.string().optional(),

  format: z
    .enum(["hardcover", "paperback", "ebook"])
    .optional(),

  pageCount: z
    .number()
    .int()
    .min(1, "Page count must be at least 1")
    .optional(),

  releaseDate: z
    .string()
    .or(z.date())
    .optional(),

  price: z
    .number({
      required_error: "Price is required",
    })
    .min(0, "Price must be 0 or more"),

  quantity: z
    .number({
      required_error: "Quantity is required",
    })
    .int()
    .min(0, "Quantity must be 0 or more"),
    
  image: z
    .string({
      required_error: "Image is required",
    })

})

});



export const UpdatedBookValidationSchema = z.object({


  title: z
    .string({
      required_error: "Title is required",
    })
    .min(2, "Title must be at least 2 characters"),

  author: z
    .string({
      required_error: "Author is required",
    })
    .min(1, "Author cannot be empty"),

  isbn: z
    .string()
    .regex(/^(\d{10}|\d{13})$/, "ISBN must be 10 or 13 digits")
    .optional(),

  genre: z.string().optional(),
  publisher: z.string().optional(),
  series: z.string().optional(),
  language: z.string().optional(),

  format: z
    .enum(["hardcover", "paperback", "ebook"])
    .optional(),

  pageCount: z
    .number()
    .int()
    .min(1, "Page count must be at least 1")
    .optional(),

  releaseDate: z
    .string()
    .or(z.date())
    .optional(),

  price: z
    .number({
      required_error: "Price is required",
    })
    .min(0, "Price must be 0 or more"),

    quantity: z
    .number({
      required_error: "Quantity is required",
    })
    .int()
    .min(0, "Quantity must be 0 or more"),
  
});


export const  BookValidationSchemas = {
CreateBookValidationSchema,
UpdatedBookValidationSchema

}