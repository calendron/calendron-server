import { pgTable, serial, uuid, timestamp, boolean } from 'drizzle-orm/pg-core';
import { users } from './users';
import { relations } from 'drizzle-orm';

export const bookings = pgTable('bookings', {
  id: serial('id').primaryKey(),
  uuid: uuid('uuid').defaultRandom(),
  userId: serial('user_id')
    .references(() => users.id)
    .notNull(),
  deleted: boolean('deleted').notNull().default(false),
  deletedAt: timestamp('deleted_at'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow()
});

export const bookingsRelations = relations(bookings, ({ one }) => ({
  user: one(users, {
    fields: [bookings.userId],
    references: [users.id]
  })
}));
