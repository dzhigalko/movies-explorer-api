const ms = require('ms');

const {
  PORT = 3000,
  DB_URL = 'mongodb://localhost:27017/bitfilmsdb',
  JWT_SECRET = 'jwt-super-secret-key',
  JWT_TTL = '7d',
  AUTH_COOKIE_TTL = ms(JWT_TTL),
  ALLOWED_CORS_ORIGINS = '',
} = process.env;

module.exports = {
  PORT,
  DB_URL,
  JWT_TTL,
  JWT_SECRET,
  AUTH_COOKIE_TTL,
  ALLOWED_CORS_ORIGINS,
};
