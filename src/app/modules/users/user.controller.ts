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

    const result = await UserServices.getAllUserIntoDB(id);


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



export const UserControllers = {
    createUserFromDB,
    getAllUserFromDB,
    getSingelUserFromDB,
    updateUserFromDB
}