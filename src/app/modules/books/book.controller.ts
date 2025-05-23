import { NextFunction, Request, Response } from "express";
import { BookServices } from "./book.service";
import catchAsync from "../../utilits/catchAsync";
import sendResponse from "../../utilits/sendResponse";
import httpStatus from 'http-status'



export const createBookFromDB = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {


   const newBook = await BookServices.createBookInToDB(req.body);

   sendResponse(res,{
    statusCode:httpStatus.OK,
    success:true,
    message:"Book created successfully",
    data:newBook
   })


});


export const getAllBookFromDB = catchAsync(async (req, res)=> {
  const allBooks = await BookServices.getALLBookInTOBD();

   sendResponse(res,{
    statusCode:httpStatus.OK,
    success:true,
    message:"Book reatried successfully",
    data:allBooks
   })

});




export const getSingelBookFromDB = catchAsync(async (req, res)=> {


  const { id } = req.params;
  const result = await BookServices.getSingelBookInToDB(id);

 
   sendResponse(res,{
    statusCode:httpStatus.OK,
    success:true,
    message:"Book reattried successfully",
    data:result
   })

});


export const deleteBookFromDB = catchAsync(async (req, res) => {
  const { id } = req.params;
  const deleted = await BookServices.deleteBookInToDB(id);

   sendResponse(res,{
    statusCode:httpStatus.OK,
    success:true,
    message:"Book created successfully",
    data:deleted
   })
});



export const updateBookFromDB = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await BookServices.updateBookInToDB(id, req.body);

     sendResponse(res,{
    statusCode:httpStatus.OK,
    success:true,
    message:"Book created successfully",
    data:result
   })

});




export const searchBooksHandler = async (req: Request, res: Response, next: NextFunction) => {

  try {

    const { title, author, minPrice, maxPrice } = req.query;

    const filters = {
      title: title as string | undefined,
      author: author as string | undefined,
      minPrice: minPrice ? parseFloat(minPrice as string) : undefined,
      maxPrice: maxPrice ? parseFloat(maxPrice as string) : undefined,
    };

    const books = await BookServices.searchBooks(filters);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Books retrieved successfully',
      data: books,
    });
  } catch (err) {
    next(err);
  }
};

export const BookContollers = {
  createBookFromDB,
  getAllBookFromDB,
  getSingelBookFromDB,
  deleteBookFromDB,
  updateBookFromDB,
  searchBooksHandler
};
