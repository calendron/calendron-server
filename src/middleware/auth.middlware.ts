import { Request, Response, NextFunction } from 'express';
import { verifyJWTToken } from '../utils/jwt';
import { db } from '../db';
import { eq } from 'drizzle-orm';
import { users } from '../db/schema';
import ApiError from '../helper/ApiError';
export const authMiddleware = async (
  req: Request,
  __: Response,
  next: NextFunction
) => {
  try {
    const authorization = req.headers['authorization'];
    const authSession = req.headers['x-auth-session'];

    if (!authorization || !authSession) {
      throw new ApiError(401, 'Unauthorized');
    }

    req.authSession = authSession as string;
    req.authorization = authorization;

    // replace "Bearer " with an empty string
    const token = authorization.replace('Bearer ', '');

    const decoded = await verifyJWTToken(token);

    if (!decoded) {
      throw new ApiError(401, 'Unauthorized');
    }
    const { email } = decoded.payload as { uuid: string; email: string };

    const userExists = await db.query.users.findFirst({
      with: {
        profile: true,
        sessions: true
      },
      where: eq(users.email, email)
    });

    if (!userExists) {
      throw new ApiError(401, 'Unauthorized');
    }

    const currentSession = userExists.sessions.find(
      (session) => session.sessionId === authSession
    );

    if (!currentSession) {
      throw new ApiError(401, 'Unauthorized');
    }

    if (currentSession.browserFingerprint !== req.fingerprint) {
      throw new ApiError(401, 'Unauthorized');
    }

    req.user = userExists;
    req.currentSession = currentSession;
    next();
  } catch (error: any) {
    next(error);
  }
};
