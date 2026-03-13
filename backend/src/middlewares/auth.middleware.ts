import { Request, Response, NextFunction } from "express";
import {User} from "../models/user.model";
import { asyncHandler } from "../utils/asyncHandler";
import { ApiError } from "../utils/ApiError";
import jwt from "jsonwebtoken";

const auth = asyncHandler(async (req: Request, res: Response, next: NextFunction)=> {
    const accessToken = req.cookies?.accessToken;

    if(!accessToken){
        throw new ApiError(404, "Access Token not found");
    }

    const accessTokenSecret = process.env.ACCESS_TOKEN_KEY;
    if(!accessTokenSecret){
        throw new ApiError(500, "ACCESS_TOKEN_KEY env var is missing");
    }

    let decodedToken: string | jwt.JwtPayload;
    try{
        decodedToken = jwt.verify(accessToken, accessTokenSecret);
    }catch (err){
        const message = err instanceof Error ? err.message : "JWT verification failed";
        console.log(`JWT Err: ${message}`);
        throw new ApiError(401,"Invalid or expired token");
    }

    if(typeof decodedToken === "string" || !decodedToken?._id){
        throw new ApiError(401, "Invalid token payload");
    }

    const user = await User.findById(decodedToken._id).select("-password -refreshToken")

    if(!user) {
        throw new ApiError(404, "User not found")
    }

    req.user = user;
    next();
});

export {auth};
