import {
  pgTable,
  serial,
  uuid,
  timestamp,
  text,
  boolean,
  pgEnum,
  json
} from 'drizzle-orm/pg-core';
import { users } from './users';
import { relations } from 'drizzle-orm';
import { dateOverridesSlots } from './date_overrides_slots';
import { weeklySchedules } from './weekly_schedules';

export const availabilitiesStatusEnum = pgEnum('availabilities_status_enum', [
  'active',
  'inactive'
]);

export const availabilities = pgTable('availabilities', {
  id: serial('id').primaryKey(),
  uuid: uuid('uuid').defaultRandom(),
  userId: serial('user_id')
    .references(() => users.id)
    .notNull(),
  name: text('schedule_name').notNull(),
  description: text('schedule_description'),
  isDefault: boolean('is_default').notNull().default(false),
  timezone: text('timezone').notNull(),
  timezoneData: json('timezone_data').notNull(),
  deleted: boolean('deleted').notNull().default(false),
  deletedAt: timestamp('deleted_at'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow()
});

export const availabilitiesRelations = relations(
  availabilities,
  ({ one, many }) => ({
    user: one(users, {
      fields: [availabilities.userId],
      references: [users.id]
    }),
    dateOverridesSlots: many(dateOverridesSlots),
    weeklySchedules: many(weeklySchedules)
  })
);
