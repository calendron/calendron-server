import { NextFunction, Request, Response } from 'express';
export const createEvent = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    res.status(200).json({ message: 'Get Events details successful' });
  } catch (err) {
    next(err);
  }
};

export const getEvents = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    res.status(200).json({ message: 'Get Events details successful' });
  } catch (err) {
    next(err);
  }
};

export const getEvent = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    res.status(200).json({ message: 'Get Event details successful' });
  } catch (err) {
    next(err);
  }
};

export const updateEvent = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    res.status(200).json({ message: 'Update Event details successful' });
  } catch (err) {
    next(err);
  }
};

export const deleteEvent = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    res.status(200).json({ message: 'Delete Event details successful' });
  } catch (err) {
    next(err);
  }
};
