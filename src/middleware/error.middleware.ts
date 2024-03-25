import { Request, Response, NextFunction } from 'express';
import ApiError from '../helper/ApiError';
import winstonLogger from '../utils/logger/winston';

const errorHandler = (
  err: any,
  _: Request,
  res: Response,
  __: NextFunction
) => {
  let error = err;
  if (!error) {
    // if not
    // create a new ApiError instance to keep the consistency
    // assign an appropriate status code
    const statusCode = error.statusCode ? 400 : 500;

    // set a message from native Error instance or a custom one
    const message = error.message || 'Something went wrong';
    console.log('statusCode', statusCode);
    console.log('message', message);

    error = new ApiError(statusCode, message, error?.errors || [], err.stack);
  }
  const response = {
    ...error,
    message: error.message,
    ...(process.env.NODE_ENV === 'development' ? { stack: error.stack } : {}) // Error stack traces should be visible in development for debugging
  };

  winstonLogger.error(`${error.message}`);
  // Send error response
  return res.status(error.statusCode).json(response);
};

export default errorHandler;
