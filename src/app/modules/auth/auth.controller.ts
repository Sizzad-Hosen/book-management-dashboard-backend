import config from "../../config";
import catchAsync from "../../utilits/catchAsync";
import sendResponse from "../../utilits/sendResponse";
import { AuthServices } from "./auth.service";

import httpStatus from 'http-status';

const loginUser = catchAsync(async (req, res) => {

  const result = await AuthServices.loginUser(req.body);

   const { refreshToken, accessToken } = result;

  res.cookie('refreshToken', refreshToken, {
    secure: config.NODE_ENV === 'production',
    httpOnly: true,
    sameSite: 'none',
    maxAge: 1000 * 60 * 60 * 24 * 365,
  });

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User is logged in successfully!',
    data: {
      accessToken,
    
    },
  });
});



const refreshToken = catchAsync(async(req,res)=>{
  
  const {refreshToken} = req.cookies;

  console.log('refresh token', req.cookies)


  const result =  await AuthServices.refreshToken(refreshToken);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Access token is retrieved successfully!',
    data: result,
  });
});


export const AuthControllers = {
    loginUser,
    refreshToken
}
