import dotnev from 'dotenv';
import config from './config/index';
dotnev.config();

import app from './app';

app.listen(config.SERVER_PORT, () => {
  console.log(`Server is running on port ${config.SERVER_PORT}`);
});
