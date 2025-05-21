import { Model } from 'mongoose';

export interface IUser {
  name: string;
  email: string;
  password: string;
  role: 'admin' | 'user';
  isDeleted?: boolean;
}

// Static methods for the User model
export interface IUserModel extends Model<IUser> {
  isUserExists(email: string): Promise<Pick<IUser, 'email' | 'password' | 'role'>>;

  isPasswordMatch(
    plainTextPassword: string,
    hashedPassword: string
  ): Promise<boolean>;
}
