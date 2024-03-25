import { rateLimit, Options } from 'express-rate-limit';
import { NextFunction, Request, Response } from 'express';
import ApiError from '../helper/ApiError';

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5000,
  standardHeaders: true,
  legacyHeaders: false,
  keyGenerator: async (req, _) => {
    const clientIp = req.clientIp;
    return clientIp || '';
  },
  handler: (_, __, ___, options: Options) => {
    throw new ApiError(
      options.statusCode || 500,
      `There are too many requests from this IP, please try again after ${Math.ceil(
        options.windowMs / 60 / 1000
      )} minutes.`
    );
  }
});

export default limiter;
