import { getUserByEmail } from "./user.service.js"
import ApiError from "../utils/ApiError.js";
import httpStatus from "http-status";

export const loginUser = async (email, password) => {
    const user = await getUserByEmail(email);
    if(!user || !(await user.isPasswordMatch(password))) {
         throw new ApiError(httpStatus.UNAUTHORIZED, 'Incorrect email or password');
    }
    return user;
}