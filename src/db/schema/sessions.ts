import {
  json,
  pgEnum,
  pgTable,
  serial,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";
import { users } from "./users";
import { BrowserData } from "../../types/schema";
import { relations } from "drizzle-orm";

export const deviceTypeEnum = pgEnum("device_type", [
  "web",
  "chrome_extension",
  "android",
  "ios",
  "desktop",
]);

export const sessions = pgTable("sessions", {
  id: uuid("id").defaultRandom().primaryKey(),
  sessionId: text("session_id").notNull(),
  userId: serial("user_id")
    .references(() => users.id)
    .notNull(),
  token: text("token").notNull(),
  expiresAt: timestamp("expire_at").notNull(),
  deviceType: deviceTypeEnum("device_type").notNull().default("web"),
  browserFingerprint: text("browser_fingerprint").notNull(),
  browserData: json("browser_data").$type<BrowserData>().notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const sessionsRelations = relations(sessions, ({ one, many }) => ({
  user: one(users, {
    fields: [sessions.userId],
    references: [users.id],
  }),
}));
