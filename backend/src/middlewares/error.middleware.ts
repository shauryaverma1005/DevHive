import { Request, Response, NextFunction } from "express";
import { ApiError } from "../utils/ApiError";

const errorHandler = async (err: any, req: Request, res: Response ,next: NextFunction) => {
    if(err instanceof ApiError) {
        return res.status(err.statusCode).json({
            success: false,
            message: err.message,
            errors: err.errors, 
        });
    }

    return res.status(500).json({
            success: false,
            message: err.message || "Internal Server error",
            stack: process.env.NODE_ENV == "Development" ? err.stack : undefined
    });
};

export {errorHandler};