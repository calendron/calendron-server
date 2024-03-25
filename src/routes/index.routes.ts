import { Router } from 'express';
import healthRouter from './health.routes';
import authRouter from './auth.routes';
import userRouter from './user.routes';
import availabilityRouter from './availability.routes';
import dashboardRouter from './dashboard.routes';

const router = Router();

router.use('/health', healthRouter);
router.use('/auth', authRouter);
router.use('/users', userRouter);
router.use('/availability', availabilityRouter);
router.use('/dashboard', dashboardRouter);

export default router;
