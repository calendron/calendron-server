import { Request, Response } from "express";
import asyncHandler from "../helper/asyncHandler";
import ApiResponse from "../helper/ApiResponse";

export const whoAmI = asyncHandler(async (req: Request, res: Response) => {
  const users = {
    firstName: req.user?.profile?.firstName,
    lastName: req.user?.profile?.lastName,
    email: req.user?.email,
    uuid: req.user?.uuid,
  };
  return res.status(200).json(new ApiResponse(200, users));
});
