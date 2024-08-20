import { User } from "./../models/user.model.js";
import ApiError from "../utils/ApiError.js"
import httpStatus from "http-status";

export const createUser = async (userBody) => {
    //check if email already exists in database
    if (await User.isEmailRegistered(userBody.email)) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'Email is already registered') 
    }
    const user = await User.create(userBody);
    return user;
};

export const getUserByEmail = async (email) => {
    return await User.findOne({email});
}

 