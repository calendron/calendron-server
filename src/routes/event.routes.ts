import { Router } from 'express';
import {
  createEvent,
  getAllEvents,
  getEvent
} from '../controllers/event.controller';

const router = Router();

router.route('/').get(getAllEvents).post(createEvent);
router.route('/:uuid').get(getEvent);

export default router;
