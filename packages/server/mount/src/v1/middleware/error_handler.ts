import { Request, Response, NextFunction } from "express"
import { ZodError } from "zod";
import { ResponseError, Status } from "../../types/api";


const ErrorHandler = (
    err: ResponseError,
    req: Request, 
    res: Response, 
    next: NextFunction
  ) => {
    const errCode = err.statusCode || 500
    let errMsg
    if (err instanceof ZodError){
      errMsg = JSON.parse(err.message)
    } else {
      errMsg = err.message || 'Something went wrong';
    }
    return res.status(errCode).json({
        status: 'ERROR',
        message: errMsg,
        stack: process.env.NODE_ENV === 'development' ? err.stack : {},
    })
}

export default ErrorHandler