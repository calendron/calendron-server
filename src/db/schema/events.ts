import {
  boolean,
  pgEnum,
  pgTable,
  serial,
  text,
  timestamp,
  uuid,
  integer
} from 'drizzle-orm/pg-core';
import { eventLocation } from './event_location';
import { users } from './users';
import { relations } from 'drizzle-orm';

export const eventsStatusEnum = pgEnum('events_status_enum', [
  'active',
  'inactive'
]);

export const eventTypeEnum = pgEnum('event_type_enum', ['free', 'paid']);

export const events = pgTable('events', {
  id: serial('id').primaryKey(),
  uuid: uuid('uuid').defaultRandom(),
  name: text('event_name').notNull(),
  locatiom: serial('event_location')
    .references(() => eventLocation.id)
    .notNull(),
  description: text('event_description'),
  color: text('event_color'),
  locationMeta: text('location_meta'),
  userId: serial('user_id')
    .references(() => users.id)
    .notNull(),
  slug: text('event_slug').notNull(),
  //   scheduled date limit
  schedules_days_limit: integer('schedules_days_limit'),
  schedules_from: timestamp('schedules_from'),
  schedules_to: timestamp('schedules_to'),
  eventStatus: eventsStatusEnum('event_status').notNull().default('active'),
  eventType: eventTypeEnum('event_type').notNull().default('free'),
  payableAmount: integer('payable_amount'),
  deleted: boolean('deleted').notNull().default(false),
  deletedAt: timestamp('deleted_at'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow()
});

export const eventsRelations = relations(events, ({ one }) => ({
  user: one(users, {
    fields: [events.userId],
    references: [users.id]
  }),
  location: one(eventLocation, {
    fields: [events.locatiom],
    references: [eventLocation.id]
  })
}));
