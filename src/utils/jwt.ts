import { HMAC } from "./../packages/oslo/crypto";
import { createJWT, validateJWT, parseJWT } from "./../packages/oslo/jwt";
import { TimeSpan } from "./../packages/oslo";

export const createJWTToken = async (payload: any, sessionId: string) => {
  const secret = await new HMAC("SHA-256").generateKey();
  const jwt = await createJWT("HS256", secret, payload, {
    headers: {
      session: sessionId,
    },
    expiresIn: new TimeSpan(30, "d"),
    issuer: "lockify",
    subject: "lockify",
    includeIssuedTimestamp: true,
  });

  return jwt;
};

export const verifyJWTToken = async (token: string) => {
  const decoded = parseJWT(token);
  return decoded;
};
