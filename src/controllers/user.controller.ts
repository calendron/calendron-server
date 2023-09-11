import { NextFunction, Request, Response } from 'express';
export const getUserDetails = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    res.status(200).json({ message: 'Get user details successful' });
  } catch (error) {
    next(error);
  }
};

export const updateUserDetails = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    res.status(200).json({ message: 'Update user details successful' });
  } catch (error) {
    next(error);
  }
};

export const getUserDetailsById = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    res.status(200).json({ message: 'Get user details by id successful' });
  } catch (error) {
    next(error);
  }
};
