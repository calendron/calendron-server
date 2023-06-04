import dotenv from 'dotenv';
import app from './app';
import db from './config/db';
import config from './config';

dotenv.config();
db.connectDB();

app.listen(config.PORT, () => {
  console.log(`🚀 Server is running on port ${config.PORT}`);
});
