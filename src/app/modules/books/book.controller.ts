import { Request, Response } from "express";
import { ZodError } from "zod";
import { BookServices } from "./book.service";
import { bookValidationSchema } from "./book.validation";

export const createBookFromDB = async (req: Request, res: Response) => {
  try {
    console.log("body", req.body);


    const validatedData = bookValidationSchema.parse(req.body);
    

    const newBook = await BookServices.createBookInToDB(validatedData);

    return res.status(201).json({
      success: true,
      message: "Book created successfully",
      data: newBook,
    });

  } catch (error) {
 

    if (error instanceof ZodError) {
      return res.status(400).json({
        success: false,
        message: "Validation error",
        errors: error.errors,
      });
    }

 
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

export const getAllBookFromDB = async(req:Request, res:Response)=>{
      try {
  
 
    
    const allBooks = await BookServices.getALLBookInTOBD();

    return res.status(201).json({
      success: true,
      message: "Book retrieved successfully",
      data: allBooks,
    });

  } catch (error) {
 

    if (error instanceof ZodError) {
      return res.status(400).json({
        success: false,
        message: "Validation error",
        errors: error.errors,
      });
    }

 
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};




export const BookContollers = {
    createBookFromDB,
    getAllBookFromDB
}