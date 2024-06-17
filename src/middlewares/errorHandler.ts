import { Request, Response, NextFunction } from 'express';
import { ApiError } from '../customError.ts/apiError';

export const errorHandler = (
  error: ApiError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log(error.toString());
  if (error.name === 'CustomError') {
    return res.status(error.code).json({
      message: error.message,
      details: error.details
    });
  }

  return res.status(500).json({
    message: 'Something went wrong',
    details: error.toString()
  });
};
