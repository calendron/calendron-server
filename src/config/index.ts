const config = {
  SERVER_PORT: process.env.SERVER_PORT || 5001,
  DATABASE_URL:
    process.env.DATABASE_URL ||
    'postgres://postgres:postgres@localhost:5432/lockify'
};

export default config;
