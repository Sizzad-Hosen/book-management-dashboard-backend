import { Model } from 'mongoose';

export type TRole = 'admin' | 'user' | 'seller' | 'buyer';

export interface IUser {
  name: string;
  email: string;
  password: string;
  role: TRole;
  isDeleted?: boolean;
}

export interface IUserModel extends Model<IUser> {
  isUserExists(
    email: string
  ): Promise<Pick<IUser, 'name' | 'email' | 'password' | 'role'> | null>;
  
  isPasswordMatch(
    plainTextPassword: string,
    hashedPassword: string
  ): Promise<boolean>;
}