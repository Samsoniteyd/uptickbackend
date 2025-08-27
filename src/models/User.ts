// import mongoose, { Document, Schema } from 'mongoose';
// import bcrypt from 'bcryptjs';
// import { IUser } from '../types';

// export interface IUserDocument extends IUser, Document {
//   comparePassword(candidatePassword: string): Promise<boolean>;
// }

// const userSchema = new Schema<IUserDocument>(
//   {
//     name: {
//       type: String,
//       required: [true, 'Name is required'],
//       trim: true,
//     },
//     email: {
//       type: String,
//       required: [true, 'Email is required'],
//       unique: true,
//       lowercase: true,
//       trim: true,
//     },
//     password: {
//       type: String,
//       required: [true, 'Password is required'],
//       minlength: [6, 'Password must be at least 6 characters'],
//     },
//     phone: {
//       type: String,
//       trim: true,
//     },
//     role: {
//       type: String,
//       enum: ['customer', 'admin', 'tailor'],
//       default: 'customer',
//     },
//   },
//   {
//     timestamps: true,
//   }
// );

// userSchema.pre('save', async function (next) {
//   if (!this.isModified('password')) return next();
  
//   try {
//     const salt = await bcrypt.genSalt(12);
//     this.password = await bcrypt.hash(this.password, salt);
//     next();
//   } catch (error: any) {
//     next(error);
//   }
// });

// userSchema.methods.comparePassword = async function (candidatePassword: string): Promise<boolean> {
//   return bcrypt.compare(candidatePassword, this.password);
// };

// export default mongoose.model<IUserDocument>('User', userSchema);