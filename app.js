const express = require('express');
const mongoose = require('mongoose');
const { errors: celebrateErrors } = require('celebrate');
const helmet = require('helmet');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const errors = require('./middlewares/errors');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const router = require('./routes');
const config = require('./utils/config');

const allowedCorsDomains = config.ALLOWED_CORS_ORIGINS.split(',');
const app = express();

app.use(helmet());
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: allowedCorsDomains,
  methods: ['GET', 'POST', 'DELETE', 'UPDATE', 'PUT', 'PATCH'],
  credentials: true,
}));

app.use((req, res, next) => {
  req.jwtSecret = config.JWT_SECRET;
  req.jwtTTL = config.JWT_TTL;
  req.cookieTTL = config.AUTH_COOKIE_TTL;
  next();
});

app.use(requestLogger);
app.use(router);

app.use(errorLogger);
app.use(celebrateErrors());
app.use(errors);

mongoose.connect(config.DB_URL, {
  useNewUrlParser: true,
});

app.listen(config.PORT, () => {
  console.log(`App listening on port ${config.PORT}`);
});
