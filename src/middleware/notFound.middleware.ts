import { Request, Response, NextFunction } from "express";
import ApiError from "../helper/ApiError";

const notFoundHandler = (req: Request, res: Response, next: NextFunction) => {
  let message = "Resource not found";
  const statusCode = 400;
  const errors = [
    {
      message: "Resource not found",
      field: "url",
      value: req.originalUrl,
    },
  ];
  const error = new ApiError(statusCode, message, errors as any, "Not Found");
  res.status(404);
  const response = {
    ...error,
    message: error.message,
    ...(process.env.NODE_ENV === "development" ? { stack: error.stack } : {}), // Error stack traces should be visible in development for debugging
  };

  next(response);
};

export default notFoundHandler;
