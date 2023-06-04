import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import cors from 'cors';

const app = express();
app.use(express.json());
app.use(helmet());
app.use(morgan('dev'));
app.use(cors());

export default app;
