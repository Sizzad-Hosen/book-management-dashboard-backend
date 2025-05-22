import { JwtPayload } from "jsonwebtoken";
import config from "../../config";
import AppError from "../../config/errors/AppError";
import { verifyToken } from "../auth/auth.utils";
import { IUser } from "./user.interface";
import { User } from "./user.model";
import httpStatus from 'http-status'
import { Admin } from "../Admin/admin.model";

const createUserIntoDB = async(payload:IUser)=>{

    const newUser = await User.create(payload);

    return newUser;
}


const getAllUserIntoDB = async(id: string, body: any)=>{
    const result = await User.find();

    return result;
}

const getSingelUserIntoDB = async(id:string)=>{

    const result = await User.findById(id);

    return result;
}

const updateUserIntoDB = async(id:string,payload:IUser)=>{

    const result = await User.findByIdAndUpdate(id,payload);

    return result;
}



// UserServices.ts (or wherever getMe lives)
const getMe = async (token: string) => {
  // verifyToken can throw, consider wrapping in try-catch or let caller handle

  const decoded = verifyToken(token, config.jwt_access_secret as string) as JwtPayload;

  const { userEmail, role } = decoded;

  console.log('decoded payload:', decoded);

  if (!userEmail || !role) {
    throw new AppError(httpStatus.UNAUTHORIZED, 'Invalid token payload');
  }

  let result = null;

  if (role === 'admin') {
    result = await Admin.findOne({ email: userEmail });
  } else if (role === 'user') {
    result = await User.findOne({ email: userEmail });
  } else {
    throw new AppError(httpStatus.UNAUTHORIZED, 'Role not authorized');
  }

  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found');
  }

  return result;
};



export const UserServices = {
    createUserIntoDB,
    getAllUserIntoDB,
    getSingelUserIntoDB,
    updateUserIntoDB,
    getMe
}