import { Schema, model } from 'mongoose';
import bcrypt from 'bcrypt';
import { IUser, IUserModel } from './user.interface';

const userSchema = new Schema<IUser, IUserModel>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['admin', 'user'], required: true },
  isDeleted: { type: Boolean, default: false },
});

// static methods
userSchema.statics.isUserExists = async function (email: string) {
  return await this.findOne({ email }, 'email password role');
};

userSchema.statics.isPasswordMatch = async function (
  plainTextPassword: string,
  hashedPassword: string
) {
  return await bcrypt.compare(plainTextPassword, hashedPassword);
};

export const User = model<IUser, IUserModel>('User', userSchema);
