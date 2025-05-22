import AppError from "../../config/errors/AppError";
import catchAsync from "../../utilits/catchAsync";
import sendResponse from "../../utilits/sendResponse";
import { UserServices } from "./user.service";
import httpStatus from 'http-status';


const createUserFromDB = catchAsync(async(req,res)=>{

    const result = await UserServices.createUserIntoDB(req.body);


sendResponse(res, {
  statusCode: httpStatus.OK,
  success: true,
  message: 'User created successfully',
  data: result,
})


})

const getAllUserFromDB = catchAsync(async(req,res)=>{

    const result = await UserServices.getAllUserIntoDB();


sendResponse(res, {
  statusCode: httpStatus.OK,
  success: true,
  message: 'User reatried successfully',
  data: result,
})


})
const getSingelUserFromDB = catchAsync(async(req,res)=>{
 
    const {id} = req.params;

    const result = await UserServices.getSingelUserIntoDB(id);


sendResponse(res, {
  statusCode: httpStatus.OK,
  success: true,
  message: 'User retried successfully',
  data: result,
})


})

const updateUserFromDB = catchAsync(async(req,res)=>{
 
    const {id} = req.params;


    const result = await UserServices.getAllUserIntoDB(id,req.body);


sendResponse(res, {
  statusCode: httpStatus.OK,
  success: true,
  message: 'User updated successfully',
  data: result,
})


})


// Controller
const getMe = catchAsync(async (req, res) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    throw new AppError(httpStatus.UNAUTHORIZED, 'Authorization token not found');
  }

  // Usually Authorization header is "Bearer <token>", so split it
  const token = authHeader.startsWith('Bearer ')
    ? authHeader.slice(7, authHeader.length)
    : authHeader;

  console.log('token:', token);

  const result = await UserServices.getMe(token);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User retrieved successfully',
    data: result,
  });
});

export const UserControllers = {
    createUserFromDB,
    getAllUserFromDB,
    getSingelUserFromDB,
    updateUserFromDB,
    getMe
}