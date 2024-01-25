import { Schema, model } from 'mongoose';
import { IAdmin } from '../types';

const adminSchema = new Schema<IAdmin>(
  {
    firstName: { type: String, required: false },
    lastName: { type: String, required: false },
    email: { type: String, required: true },
    password: { type: String, required: true },
  },
  {
    timestamps: true,
  },
);

export const AdminModel = model('Admin', adminSchema, 'admins');
