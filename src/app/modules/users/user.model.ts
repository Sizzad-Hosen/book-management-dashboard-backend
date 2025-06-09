import { Schema, model } from 'mongoose';
import bcrypt from 'bcrypt';
import { IUser, IUserModel } from './user.interface';
import config from '../../config';

const userSchema = new Schema<IUser, IUserModel>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, select: false },
    role: { 
      type: String, 
      enum: ['admin', 'user', 'seller', 'buyer'], 
      required: true 
    },
    isDeleted: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

// In your User model (server-side)
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Static method to check if user exists
userSchema.statics.isUserExists = async function(email: string) {
  return await this.findOne({ email, isDeleted: false })
    .select('+password')
    .lean();
};

// Static method to compare passwords
userSchema.statics.isPasswordMatch = async function(
  plainTextPassword: string,
  hashedPassword: string
) {
  return await bcrypt.compare(plainTextPassword, hashedPassword);
};

export const User = model<IUser, IUserModel>('User', userSchema);