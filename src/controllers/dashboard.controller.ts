import { Request, Response } from 'express';
import asyncHandler from '../helper/asyncHandler';

export const getDashboardDatas = asyncHandler(
  async (req: Request, res: Response) => {
    return res.status(200).json({
      message: 'Dashboard data fetched successfully',
      data: {
        user: req.user
      }
    });
  }
);
