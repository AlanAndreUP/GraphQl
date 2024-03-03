import { model } from "mongoose";
import userSchema from "../schema/userSchema";
import { User } from "../../domain/user";

export const Users = model<User>('Users', userSchema)
