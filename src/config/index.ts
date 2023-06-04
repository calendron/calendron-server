export default {
  PORT: process.env.PORT || 4000,
  MONGO_URI: process.env.MONGO_URI || 'mongodb://localhost:27017/calendron',
  JWT_SECRET:
    process.env.JWT_SECRET || 'b42a873b6c1ff030d3e9b21a8ad267ee5ca7b0a7',
  JWT_EXPIRE: process.env.JWT_EXPIRE || '7d',
  BCRYPT_SALT: process.env.BCRYPT_SALT || '10',
};
