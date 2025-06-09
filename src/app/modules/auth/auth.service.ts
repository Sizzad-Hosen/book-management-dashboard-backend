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
    console.log('User not found in database');
    throw new AppError(httpStatus.NOT_FOUND, "User does not exist");
  }
  
  console.log('Found user:', {
    email: user.email,
    storedPassword: user.password, // This should show the hashed password
    role: user.role
  });

  // 2. Check if password matches

  
  const isPasswordMatched = await User.isPasswordMatch(password, user.password);


  
  if (!isPasswordMatched) {
    console.log('Password comparison failed');
    throw new AppError(httpStatus.UNAUTHORIZED, "Password is incorrect");
  }

  // Token Payload
  const jwtPayload = {
    userEmail: user.email,
    role: user.role,
  };

  console.log('Creating tokens with payload:', jwtPayload);

  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expires_in as string
  );

  const refreshToken = createToken(
    jwtPayload,
    config.jwt_refresh_secret as string,
    config.jwt_refresh_expires_in as string,
  );

  console.log('Login successful. Tokens generated.');
  return {
    accessToken,
    refreshToken,
  };
};

const refreshToken = async (token: string) => {
  
  // checking if the given token is valid
  const decoded = verifyToken(token, config.jwt_refresh_secret as string);

  console.log('verifytoken', decoded)


  const { userEmail, iat } = decoded;

  // checking if the user is exist
  const user = await User.isUserExists(userEmail);
  console.log('user', user)


  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'This user is not found !');
  }

  // if (
  //   user.passwordChangedAt &&
  //   User.isJWTIssuedBeforePasswordChanged(user.passwordChangedAt, iat as number)
  // ) {
  //   throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized !');
  // }

  const jwtPayload = {
    userEmail: user.email,
    role: user.role,
  };

  console.log('jwt payload', jwtPayload)
  
  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expires_in as string,
  );

    console.log('accessToken', accessToken)

  return {
    accessToken,
  };
};


export const AuthServices = {
  loginUser,
  refreshToken,

};

