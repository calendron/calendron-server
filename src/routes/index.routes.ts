import { Router } from 'express';
import eventsRouter from './event.routes';
import usersRouter from './user.routes';
import authRouter from './auth.routes';

const routes = Router();

routes.use('/events', eventsRouter);
routes.use('/users', usersRouter);
routes.use('/auth', authRouter);

export default routes;
