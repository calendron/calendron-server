import { Request, Response, NextFunction } from 'express';
import { BrowserData } from '../types/schema';

export const rootMiddleware = (
  req: Request,
  __: Response,
  next: NextFunction
) => {
  const fingerprint = req.headers['fingerprint'];
  const browserData = req.headers['browser-data'];

  if (fingerprint) {
    req.fingerprint = fingerprint as string;
  }

  if (browserData) {
    const browserDataString: BrowserData = JSON.parse(browserData as string);
    req.browserData = browserDataString;
  }

  next();
};
