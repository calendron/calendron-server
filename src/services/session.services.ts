import { db } from "../db";
import { sessions } from "../db/schema";
import { TimeSpan, createDate } from "../packages/oslo";
import { alphabet, generateRandomString } from "../packages/oslo/crypto";
import { BrowserData } from "../types/schema";
import { createJWTToken } from "../utils/jwt";

export function generateId(length: number): string {
  return generateRandomString(length, alphabet("0-9", "a-z"));
}

export async function createSession(
  userId: number,
  payload: Object,
  browserData: BrowserData,
  browserFingerprint: string,
) {
  const sessionId = generateId(40);
  const sessionExpiresAt = createDate(new TimeSpan(7, "d"));
  const token = await createJWTToken(payload, sessionId);
  await db
    .insert(sessions)
    .values({
      sessionId: sessionId,
      userId: userId,
      token: token,
      expiresAt: sessionExpiresAt,
      browserFingerprint: browserFingerprint,
      browserData: browserData,
    })
    .returning({ sessionId: sessions.sessionId });

  return {
    sessionId,
    token,
  };
}
