import { drizzle } from 'drizzle-orm/postgres-js';
import { migrate } from 'drizzle-orm/postgres-js/migrator';
import postgres from 'postgres';
import config from '../config';

const migrationClient = postgres(config.DATABASE_URL, { max: 1 });
const db = drizzle(migrationClient);

const main = async () => {
  try {
    await migrate(db, {
      migrationsFolder: './src/db/migrations'
    });
    console.log('Migration successful');
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

main();
