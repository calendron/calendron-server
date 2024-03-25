import moment from 'moment';
import { db } from '../db';
import { weeklySchedules, weeklySchedulesSlots } from '../db/schema';

type WeekDayName =
  | 'sunday'
  | 'monday'
  | 'tuesday'
  | 'wednesday'
  | 'thursday'
  | 'friday'
  | 'saturday';

export const weekDayNames: WeekDayName[] = [
  'sunday',
  'monday',
  'tuesday',
  'wednesday',
  'thursday',
  'friday',
  'saturday'
];

export const saveWeeklySchedule = async (
  userId: number,
  availabilityId: number,
  dayName: WeekDayName
) => {
  const schedules = await db
    .insert(weeklySchedules)
    .values({
      userId,
      availabilityId,
      dayName
    })
    .returning({
      id: weeklySchedules.id
    });
  const schedulesId = schedules[0].id;
  if (dayName !== 'saturday' && dayName !== 'sunday') {
    await db.insert(weeklySchedulesSlots).values({
      userId,
      weeklySchedulesId: schedulesId,
      startTime: new Date(moment('09:00', 'HH:mm').format()),
      endTime: new Date(moment('12:00', 'HH:mm').format())
    });
  }
};
