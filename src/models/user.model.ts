import { Schema, model } from "mongoose";
import { IUser } from "../types";

const userSchema = new Schema<IUser>({
    firstName: {type: String, required: false},
    lastName: {type: String, required: false},
    email:{type: String, required: true},
    password:{type: String, required: true},
}, {
    timestamps: true
});

export const UserModel = model('User', userSchema, 'users');