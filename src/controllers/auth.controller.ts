import { NextFunction, Request, Response } from 'express';

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      throw new Error('Email and password are required');
    }
    res.status(200).json({ message: 'Login successful' });
  } catch (error) {
    next(error);
  }
};

export const register = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      throw new Error('Email and password are required');
    }
    res.status(200).json({ message: 'Register successful' });
  } catch (error) {
    next(error);
  }
};
