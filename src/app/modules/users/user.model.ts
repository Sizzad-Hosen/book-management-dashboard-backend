import { Schema, model } from 'mongoose';
import bcrypt from 'bcrypt';
import { IUser } from './user.interface';


const userSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: ['admin', 'user'],
      default: 'user',
    },
        isDeleted: { type: String, required: false }, // Optional field
  },
  {
    timestamps: true,
  }
);

// Hash password before saving
userSchema.pre('save', async function (next) {

  if (this.isModified('password')) {

    const hashed = await bcrypt.hash(this.password, 10);
    this.password = hashed;

  }
  next();
});

export const UserModel = model<IUser>('User', userSchema);
