import { Router } from 'express';
import {
  getUserDetails,
  getUserDetailsById,
  updateUserDetails,
} from '../controllers/index.controller';

const userRouter = Router();

userRouter.route('/').get(getUserDetails).put(updateUserDetails);
userRouter.route('/:id').get(getUserDetailsById);

export default userRouter;
