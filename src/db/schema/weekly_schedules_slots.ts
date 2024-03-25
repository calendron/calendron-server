import { pgTable, serial, uuid, timestamp, boolean } from 'drizzle-orm/pg-core';
import { users } from './users';
import { weeklySchedules } from './weekly_schedules';
import { relations } from 'drizzle-orm';

export const WeeklySchedulesSlots = pgTable('weekly_schedules_slots', {
  id: serial('id').primaryKey(),
  uuid: uuid('uuid').defaultRandom(),
  userId: serial('user_id')
    .references(() => users.id)
    .notNull(),
  weeklySchedulesId: serial('weekly_schedules_id')
    .references(() => weeklySchedules.id)
    .notNull(),
  startTime: timestamp('start_time').notNull(),
  endTime: timestamp('end_time').notNull(),
  deleted: boolean('deleted').notNull().default(false),
  deletedAt: timestamp('deleted_at'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow()
});

export const weeklySchedulesSlotsRelations = relations(
  WeeklySchedulesSlots,
  ({ one }) => ({
    user: one(users, {
      fields: [WeeklySchedulesSlots.userId],
      references: [users.id]
    }),
    weeklySchedules: one(weeklySchedules, {
      fields: [WeeklySchedulesSlots.weeklySchedulesId],
      references: [weeklySchedules.id]
    })
  })
);
