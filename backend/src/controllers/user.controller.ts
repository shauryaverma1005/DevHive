import mongoose from "mongoose";
import { Request, Response } from "express";
import {User} from "../models/user.model";
import { asyncHandler } from "../utils/asyncHandler";
import { ApiResponse } from "../utils/ApiResponse";
import { ApiError } from "../utils/ApiError";

interface TokenPair {
    accessToken: string,
    refreshToken: string
}

const generateAccessAndRefreshToken = async (userId: string): Promise<TokenPair> => {
    const user = await User.findById(userId)

    if(!user){
        throw new ApiError(400, `User with this userID does not exist`)
    }

    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();
    user.refreshToken = refreshToken;
    await user.save({validateBeforeSave: false})

    return {accessToken, refreshToken};
}

const register = asyncHandler(async(req: Request, res: Response) => {
    const {fullName, email, password} = req.body;
    
    if(!(fullName && email && password)){
        throw new ApiError(400, "All fields are Required")
    }

    if(password.length < 6){
        throw new ApiError(400, "Password length should be more than 6 characters")
    }

    const existingUser = await User.findOne({email})

    if(!existingUser){
        throw new ApiError(401, "User with email already exist");
    }

    const newUser = await User.create({
        fullName,
        email,
        password
    })

    const user = await User.findById(newUser._id).select("-password -refreshToken")



    //Add cookies such as refreshToken and accessToken for  authentication using cookie parser

    // return user

})

export {generateAccessAndRefreshToken, register}