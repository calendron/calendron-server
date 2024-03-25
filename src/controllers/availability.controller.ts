import { Request, Response } from 'express';
import asyncHandler from '../helper/asyncHandler';
import { db } from '../db';
import { availabilities, dayNameEnum, weeklySchedules } from '../db/schema';
import ApiResponse from '../helper/ApiResponse';
import { eq } from 'drizzle-orm';
import {
  saveWeeklySchedule,
  weekDayNames
} from '../services/availabilities.services';

export const getAvailabilities = asyncHandler(
  async (req: Request, res: Response) => {
    const userId = req.user?.id;
    const allAvailabilities = await db.query.availabilities.findMany({
      where: eq(availabilities.userId, userId!),
      columns: {
        uuid: true,
        name: true,
        isDefault: true,
        timezoneData: true
      }
    });

    return res.status(200).json(
      new ApiResponse(200, {
        availabilities: allAvailabilities
      })
    );
  }
);

export const getAvailability = asyncHandler(
  async (req: Request, res: Response) => {
    const uuid = req.params.uuid;
    const availability = await db.query.availabilities.findFirst({
      where: eq(availabilities.uuid, uuid),
      columns: {
        uuid: true,
        name: true,
        description: true,
        timezone: true,
        timezoneData: true,
        isDefault: true
      },
      with: {
        weeklySchedules: {
          columns: {
            uuid: true,
            dayName: true
          },
          with: {
            weeklySchedulesSlots: {
              columns: {
                uuid: true,
                startTime: true,
                endTime: true
              }
            }
          }
        }
      }
    });

    return res.status(200).json(
      new ApiResponse(200, {
        availability
      })
    );
  }
);

export const createAvailability = asyncHandler(
  async (req: Request, res: Response) => {
    const { name, description, timezone } = req.body;
    const timezoneData = timezone ? JSON.parse(timezone) : {};
    const userId = req.user?.id;
    const userAvailabilities = await db.query.availabilities.findMany({
      where: eq(availabilities.userId, userId!)
    });
    console.log(userAvailabilities);
    const isDefault = userAvailabilities.length === 0;
    const availability = await db
      .insert(availabilities)
      .values({
        name,
        description,
        timezone,
        timezoneData,
        userId,
        isDefault
      })
      .returning({
        uuid: availabilities.uuid,
        id: availabilities.id
      });

    const availabilityId = availability[0].id;

    for (const dayName of weekDayNames) {
      await saveWeeklySchedule(userId!, availabilityId, dayName);
    }

    return res.status(201).json(
      new ApiResponse(201, {
        uuid: availability[0].uuid
      })
    );
  }
);
