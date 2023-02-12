import { Request, Response, NextFunction } from "express"
import { ZodError } from "zod";

export interface ResponseError extends Error {
  status?: number
}

const ErrorHandler = (
    err: ResponseError,
    req: Request, 
    res: Response, 
    next: NextFunction
  ) => {
    const errStatus = err.status || 500
    let errMsg
    if (err instanceof ZodError){
      errMsg = JSON.parse(err.message)
    } else {
      errMsg = err.message || 'Something went wrong';
    }
    return res.status(errStatus).json({
        success: false,
        status: errStatus,
        message: errMsg,
        stack: process.env.NODE_ENV === 'development' ? err.stack : {}
    })
}

export default ErrorHandler