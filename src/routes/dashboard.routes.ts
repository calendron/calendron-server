import { Router } from 'express';
import { getDashboardDatas } from '../controllers/dashboard.controller';

const router = Router();

router.get('/', getDashboardDatas);

export default router;
