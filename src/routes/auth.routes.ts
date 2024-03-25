import { Router } from 'express';
import { login, logout, register } from '../controllers/auth.controller';
import { loginValidator, registerValidator } from '../validator/auth.validator';
import { validate } from '../validator/validate';
import { authMiddleware } from '../middleware/auth.middlware';

const router = Router();

router.route('/login').post(loginValidator(), validate, login);
router.route('/register').post(registerValidator(), validate, register);
router
  .route('/logout')
  .post(authMiddleware, logout)
  .get(authMiddleware, logout);
router
  .route('/logout/all')
  .post(authMiddleware, logout)
  .get(authMiddleware, logout);

export default router;
