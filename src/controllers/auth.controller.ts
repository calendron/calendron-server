import { Request, Response } from 'express';
import asyncHandler from '../helper/asyncHandler';
import ApiError from '../helper/ApiError';
import ApiResponse from '../helper/ApiResponse';
import { db } from '../db';
import { sessions, users } from '../db/schema';
import { createSession } from '../services/session.services';
import { eq } from 'drizzle-orm';
import bcrypt from 'bcryptjs';

export const register = asyncHandler(async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const userExists = await db.query.users.findFirst({
    where: eq(users.email, email)
  });

  if (userExists) {
    throw new ApiError(400, 'User already exists');
  }

  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  const user = await db
    .insert(users)
    .values({
      email,
      password: hashedPassword
    })
    .returning({
      userId: users.id,
      uuid: users.uuid,
      email: users.email
    });

  const userId = user[0].userId;
  const payload = {
    uuiu: user[0].uuid,
    email: user[0].email
  };

  const { sessionId, token } = await createSession(
    userId,
    payload,
    req.browserData,
    req.fingerprint
  );
  return res
    .cookie('auth_session', sessionId, {
      httpOnly: true,
      secure: false,
      sameSite: 'none',
      path: '/',
      domain: 'localhost',
      maxAge: 7 * 24 * 60 * 60 * 1000
    })
    .cookie('auth_token', token, {
      httpOnly: true,
      secure: false,
      sameSite: 'none',
      path: '/',
      domain: 'localhost',
      maxAge: 7 * 24 * 60 * 60 * 1000
    })
    .status(200)
    .json(new ApiResponse(200, { auth_token: token, auth_session: sessionId }));
});
export const login = asyncHandler(async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const userExists = await db.query.users.findFirst({
    where: eq(users.email, email)
  });

  if (!userExists) {
    throw new ApiError(400, 'User does not exist');
  }

  const passwordMatch = await bcrypt.compare(
    password as string,
    userExists.password as string
  );

  if (!passwordMatch) {
    throw new ApiError(400, 'Invalid password');
  }

  const userId = userExists.id;

  const payload = {
    uuiu: userExists.uuid,
    email: userExists.email
  };
  const { sessionId, token } = await createSession(
    userId,
    payload,
    req.browserData,
    req.fingerprint
  );
  return res
    .cookie('auth_session', sessionId, {
      httpOnly: true,
      secure: false,
      sameSite: 'none',
      path: '/',
      domain: 'localhost',
      maxAge: 7 * 24 * 60 * 60 * 1000
    })
    .cookie('auth_token', token, {
      httpOnly: true,
      secure: false,
      sameSite: 'none',
      path: '/',
      domain: 'localhost',
      maxAge: 7 * 24 * 60 * 60 * 1000
    })
    .status(200)
    .json(new ApiResponse(200, { auth_token: token, auth_session: sessionId }));
});

export const logout = asyncHandler(async (req: Request, res: Response) => {
  const currentSession = req.currentSession;
  if (currentSession) {
    await db
      .delete(sessions)
      .where(eq(sessions.sessionId, currentSession.sessionId));
  }
  return res.status(200).json(new ApiResponse(200, 'Logged out'));
});

export const logoutFromAllDevices = asyncHandler(
  async (req: Request, res: Response) => {
    await db
      .delete(sessions)
      .where(eq(sessions.userId, req.user?.id as number));
    return res
      .status(200)
      .json(new ApiResponse(200, 'Logged out from all devices'));
  }
);
