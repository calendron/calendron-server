import { relations } from 'drizzle-orm';
import {
  boolean,
  pgEnum,
  pgTable,
  serial,
  text,
  timestamp,
  uuid
} from 'drizzle-orm/pg-core';
import { profiles } from './profiles';
import { sessions } from './sessions';
import { availabilities } from './availabilities';
import { events } from './events';
import { bookings } from './bookings';

export const userRoleEnum = pgEnum('role_enum', [
  'super_admin',
  'admin',
  'user'
]);

export const accountStatusEnum = pgEnum('account_status_enum', [
  'active',
  'inactive',
  'suspended',
  'banned'
]);

export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  uuid: uuid('uuid').defaultRandom(),
  email: text('email').notNull().unique(),
  password: text('password').notNull(),
  role: userRoleEnum('role').notNull().default('user'),
  status: accountStatusEnum('status').notNull().default('active'),
  emailVerified: boolean('email_verified').notNull().default(false),
  emailVerifiedAt: timestamp('email_verified_at'),
  deleted: boolean('deleted').notNull().default(false),
  deletedAt: timestamp('deleted_at'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow()
});

export const userRelations = relations(users, ({ one, many }) => ({
  profile: one(profiles, {
    fields: [users.id],
    references: [profiles.userId]
  }),
  sessions: many(sessions),
  bookings: many(bookings),
  events: many(events),
  availabilities: many(availabilities)
}));
