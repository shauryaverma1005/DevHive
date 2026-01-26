import { Request, Response, RequestHandler, NextFunction } from "express";

const asyncHandler = (func: RequestHandler) => 
    async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        await func(req, res, next);
    } catch (error) {
       next(error)
    }
}

export {asyncHandler}