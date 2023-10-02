import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import cors from 'cors';
import routes from './routes/index.routes';

const app = express();
app.use(express.json());
app.use(helmet());
app.use(morgan('dev'));
app.use(cors());

app.use('/api/v1', routes);

export default app;
