import { boolean, pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core';
import { users } from './users';
import { relations } from 'drizzle-orm';

export const profiles = pgTable('profiles', {
  id: serial('id').primaryKey(),
  firstName: text('first_name').notNull(),
  lastName: text('last_name').notNull(),
  countryCode: text('country_code'),
  phoneNumber: text('phone_number'),
  userId: serial('user_id')
    .references(() => users.id)
    .notNull(),
  refreshToken: text('refresh_token'),
  accessToken: text('access_token'),
  expiresAt: timestamp('expires_at'),
  deleted: boolean('deleted').notNull().default(false),
  deletedAt: timestamp('deleted_at'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow()
});

export const profilesRelations = relations(profiles, ({ one }) => ({
  user: one(users, {
    fields: [profiles.userId],
    references: [users.id]
  })
}));
