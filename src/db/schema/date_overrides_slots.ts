import {
  pgTable,
  serial,
  uuid,
  timestamp,
  boolean,
  pgEnum
} from 'drizzle-orm/pg-core';
import { users } from './users';
import { availabilities } from './availabilities';

export const schedulesStatusEnum = pgEnum('availability_status_enum', [
  'active',
  'inactive'
]);

export const dateOverridesSlots = pgTable('date_overrides_slots', {
  id: serial('id').primaryKey(),
  uuid: uuid('uuid').defaultRandom(),
  userId: serial('user_id')
    .references(() => users.id)
    .notNull(),
  availabilityId: serial('availability_id')
    .references(() => availabilities.id)
    .notNull(),
  date: timestamp('date').notNull(),
  startTime: timestamp('start_time').notNull(),
  endTime: timestamp('end_time').notNull(),
  deleted: boolean('deleted').notNull().default(false),
  deletedAt: timestamp('deleted_at'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow()
});
