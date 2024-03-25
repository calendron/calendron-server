import { Router } from 'express';
import { authMiddleware } from '../middleware/auth.middlware';
import {
  clearSingleSession,
  getAllUserSessions,
} from '../controllers/session.controller';

const router = Router();

router.route('/all').get(authMiddleware, getAllUserSessions);
router.route('/:sessionId').delete(authMiddleware, clearSingleSession);

export default router;
