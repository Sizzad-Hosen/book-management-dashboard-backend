import config from "../../config";
import AppError from "../../config/errors/AppError";
import { User } from "../users/user.model";
import httpStatus from 'http-status';
import { createToken, verifyToken } from "./auth.utils";

const loginUser = async (payload: TLoginUser) => {
  const { email, password } = payload;

  // 1. Check if user exists
  const user = await User.isUserExists(email);

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "User does not exist");
  }

  // 2. Check if password matches
  const isPasswordMatched = await User.isPasswordMatch(password, user.password);

  if (!isPasswordMatched) {
    throw new AppError(httpStatus.UNAUTHORIZED, "Password is incorrect");
  }

   // Token Payload
  const jwtPayload = {
    userId: user.email,
    role: user.role,
  };

console.log('jwtpayload',jwtPayload)

  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expires_in as string
  );



  console.log('accessToken', accessToken)
  // 4. Optionally: generate refresh token

   const refreshToken = createToken(
    jwtPayload,
    config.jwt_refresh_secret as string,
    config.jwt_refresh_expires_in as string,
  );


  return {
    accessToken,
    refreshToken,
  };
};

export const AuthServices = {
  loginUser,
};
