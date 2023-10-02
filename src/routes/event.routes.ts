import e, { Router } from 'express';
import {
  createEvent,
  deleteEvent,
  getEvent,
  getEvents,
  updateEvent,
} from '../controllers/index.controller';

const eventsRouter = Router();

eventsRouter.route('/').get(getEvents).post(createEvent);
eventsRouter.route('/:id').get(getEvent).put(updateEvent).delete(deleteEvent);

export default eventsRouter;
