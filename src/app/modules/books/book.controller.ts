import { NextFunction, Request, Response } from "express";
import { ZodError } from "zod";
import { BookServices } from "./book.service";
import { bookValidationSchema } from "./book.validation";
import catchAsync from "../../utilits/catchAsync";

// ✅ Create Book

export const createBookFromDB = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
  const validatedData = bookValidationSchema.parse(req.body);
  const newBook = await BookServices.createBookInToDB(validatedData);

  return res.status(201).json({
    success: true,
    message: "Book created successfully",
    data: newBook,
  });
});

// ✅ Get All Books
export const getAllBookFromDB = catchAsync(async (req, res)=> {
  const allBooks = await BookServices.getALLBookInTOBD();

  return res.status(200).json({
    success: true,
    message: "Books retrieved successfully",
    data: allBooks,
  });
});

// ✅ Get Single Book
export const getSingelBookFromDB = catchAsync(async (req, res)=> {
  const { id } = req.params;
  const result = await BookServices.getSingelBookInToDB(id);

  if (!result) {
    return res.status(404).json({
      success: false,
      message: "Book not found",
    });
  }

  return res.status(200).json({
    success: true,
    message: "Book retrieved successfully",
    data: result,
  });
});

// ✅ Delete Book
export const deleteBookFromDB = catchAsync(async (req, res) => {
  const { id } = req.params;
  const deleted = await BookServices.deleteBookInToDB(id);

  return res.status(200).json({
    success: true,
    message: "Book deleted successfully",
    data: deleted,
  });
});

// ✅ Update Book
export const updateBookFromDB = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await BookServices.updateBookInToDB(id, req.body);

  return res.status(200).json({
    success: true,
    message: "Book updated successfully",
    data: result,
  });
});

// ✅ Export All as Controller
export const BookContollers = {
  createBookFromDB,
  getAllBookFromDB,
  getSingelBookFromDB,
  deleteBookFromDB,
  updateBookFromDB,
};
