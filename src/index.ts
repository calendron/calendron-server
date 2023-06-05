import dotenv from 'dotenv';
dotenv.config();
import app from './app';
import db from './config/db';
import config from './config';

db.connectDB();

app.listen(config.PORT, () => {
  console.log(`🚀 Server is running on port ${config.PORT}`);
});
