import { Request, Response } from "express";
import asyncHandler from "../helper/asyncHandler";
import ApiResponse from "../helper/ApiResponse";
import { sessions } from "../db/schema";
import { db } from "../db";
import { eq } from "drizzle-orm";

export const getAllUserSessions = asyncHandler(
  async (req: Request, res: Response) => {
    const sessions = await req.user?.sessions;
    return res.status(200).json(new ApiResponse(200, sessions));
  },
);

export const clearSingleSession = asyncHandler(
  async (req: Request, res: Response) => {
    const sessionId = req.params.sessionId;
    await db.delete(sessions).where(eq(sessions.sessionId, sessionId));
    return res.status(200).json(new ApiResponse(200, "Session cleared"));
  },
);
