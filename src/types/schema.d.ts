import { users } from '../db/schema';

export type BrowserData = {
  ua: string;
  browser: {
    name: string;
    version: string;
    major: string;
  };
  engine: {
    name: string;
    version: string;
  };
  os: {
    name: string;
    version: string;
  };
  device: object;
  cpu: object;
};

type User = {
  id: number;
  uuid: string | null;
  email: string;
  password: string;
  role: 'super_admin' | 'admin' | 'user';
  status: 'active' | 'inactive' | 'suspended' | 'banned';
  emailVerified: boolean;
  emailVerifiedAt: Date | null;
  deleted: boolean;
  deletedAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
  profile: Profile;
  sessions: Sessions[];
};

type Profile = {
  id: number;
  firstName: string;
  lastName: string;
  countryCode: string | null;
  phoneNumber: string | null;
  userId: number;
  refreshToken: string | null;
  accessToken: string | null;
  expiresAt: Date | null;
  deleted: boolean;
  deletedAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
};

type Sessions = {
  id: string;
  sessionId: string;
  userId: number;
  token: string;
  expiresAt: Date;
  browserFingerprint: string;
  deviceType: 'web' | 'chrome_extension' | 'android' | 'ios' | 'desktop';
  browserData: BrowserData;
  createdAt: Date;
  updatedAt: Date;
};

declare global {
  namespace Express {
    interface Request {
      fingerprint: string;
      browserData: BrowserData;
      authorization: string;
      authSession: string;
      user: User | undefined;
      currentSession: Sessions | undefined;
    }
  }
}
