import ApiResponse from '../helper/ApiResponse';
import asyncHandler from '../helper/asyncHandler';
import { Request, Response } from 'express';
export const healthCheck = asyncHandler(async (req: Request, res: Response) => {
  return res
    .status(200)
    .json(new ApiResponse(200, 'OK', 'Health check passed'));
});
