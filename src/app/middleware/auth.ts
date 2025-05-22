import httpStatus from 'http-status';
import jwt, { JwtPayload } from 'jsonwebtoken';
import catchAsync from "../utilits/catchAsync";
import { NextFunction, Request, Response } from 'express';
import AppError from '../config/errors/AppError';
import config from '../config';
import { User } from '../modules/users/user.model';

const auth = catchAsync(async (req: Request, res: Response, next: NextFunction) => {


  const authHeader = req.headers.authorization;
  
  console.log('Authorization Header:', authHeader);

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throw new AppError(httpStatus.UNAUTHORIZED, 'No token provided or wrong format!');
  }

  const token = authHeader.split(' ')[1];

  let decoded: JwtPayload;

  try {
    decoded = jwt.verify(token, config.jwt_access_secret as string) as JwtPayload;
  } catch (err) {
    throw new AppError(httpStatus.UNAUTHORIZED, 'Invalid or expired token!');
  }

  console.log('Decoded Token:', decoded);

  const { userEmail } = decoded;

  const user = await User.isUserExists(userEmail);

  console.log('user',user)

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found!');
  }

  req.user = decoded;

  next();

});


export default auth;
