import { pgEnum, pgTable, serial, text, uuid } from 'drizzle-orm/pg-core';

export const eventLocationsEnum = pgEnum('event_locations_enum', [
  'active',
  'inactive'
]);

export const eventLocation = pgTable('event_location', {
  id: serial('id').primaryKey(),
  name: text('location_name').notNull(),
  status: eventLocationsEnum('status').notNull().default('active')
});
