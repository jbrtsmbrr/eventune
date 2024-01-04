'use server'

import User, { IUser } from "../models/user.model";
import { connect } from "@/lib/database";

export const createUser = async (user: IUser) => {
  try {
    await connect();
    console.log(user)
    const newUser = await User.create(user);
    
    console.log(newUser)

    return JSON.parse(JSON.stringify(newUser))
  } catch {
    throw new Error('Something went wrong while creating user.')
  }
}