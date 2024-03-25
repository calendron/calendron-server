import { Router } from 'express';
import { authMiddleware } from '../middleware/auth.middlware';
import { whoAmI } from '../controllers/user.controller';

const router = Router();

router.route('/whoami').get(authMiddleware, whoAmI);

export default router;
