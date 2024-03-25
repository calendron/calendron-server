import dotnev from 'dotenv';
dotnev.config();
import config from './config/index';

import app from './app';

app.listen(config.SERVER_PORT, () => {
  console.log(`Server is running on port ${config.SERVER_PORT}`);
});
