import express from 'express';
import cors from 'cors';
import requestIp from 'request-ip';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';

import logger from './utils/logger/morgan';
import router from './routes/index.routes';
import errorHandler from './middleware/error.middleware';
import limiter from './utils/limiter';
import notFoundHandler from './middleware/notFound.middleware';
import { rootMiddleware } from './middleware/root.middleware';

const app = express();
app.use(cors());
app.use(helmet());
app.use(requestIp.mw());
app.use(cookieParser());
app.use(logger);
app.use(limiter);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(rootMiddleware);
app.use('/api/v1', router);

app.use(notFoundHandler);
app.use(errorHandler);

export default app;
