import { validationResult } from 'express-validator';
import { Request, Response, NextFunction } from 'express';
import ApiError from '../helper/ApiError';
export const validate = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  const extractedErrors: any[] = [];
  errors
    .array()
    .map((err: any) => extractedErrors.push({ [err.path]: err.msg }));

  // 422: Unprocessable Entity
  throw new ApiError(
    422,
    'Received data is not valid',
    extractedErrors as never[]
  );
};
