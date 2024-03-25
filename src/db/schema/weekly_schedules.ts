import {
  pgTable,
  serial,
  uuid,
  timestamp,
  text,
  boolean,
  pgEnum
} from 'drizzle-orm/pg-core';
import { users } from './users';
import { availabilities } from './availabilities';
import { relations } from 'drizzle-orm';
import { weeklySchedulesSlots } from './weekly_schedules_slots';

export const dayNameEnum = pgEnum('day_name_enum', [
  'sunday',
  'monday',
  'tuesday',
  'wednesday',
  'thursday',
  'friday',
  'saturday'
]);

export const weeklySchedules = pgTable('weekly_schedules', {
  id: serial('id').primaryKey(),
  uuid: uuid('uuid').defaultRandom(),
  dayName: dayNameEnum('day_name').notNull(),
  userId: serial('user_id')
    .references(() => users.id)
    .notNull(),
  availabilityId: serial('availability_id')
    .references(() => availabilities.id)
    .notNull(),
  deleted: boolean('deleted').notNull().default(false),
  deletedAt: timestamp('deleted_at'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow()
});

export const weeklySchedulesRelations = relations(
  weeklySchedules,
  ({ one, many }) => ({
    user: one(users, {
      fields: [weeklySchedules.userId],
      references: [users.id]
    }),
    availability: one(availabilities, {
      fields: [weeklySchedules.availabilityId],
      references: [availabilities.id]
    }),
    weeklySchedulesSlots: many(weeklySchedulesSlots)
  })
);
