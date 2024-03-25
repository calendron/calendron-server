import { Router } from 'express';
import { authMiddleware } from '../middleware/auth.middlware';
import {
  createAvailability,
  getAvailabilities,
  getAvailability
} from '../controllers/availability.controller';

const router = Router();

router
  .route('/')
  .get(authMiddleware, getAvailabilities)
  .post(authMiddleware, createAvailability);

router.route('/:uuid').get(authMiddleware, getAvailability);

export default router;
