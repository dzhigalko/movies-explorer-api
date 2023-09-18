const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../utils/UnauthorizedError');

module.exports = (req, res, next) => {
  const { jwtSecret } = req;
  const { token } = req.cookies;

  if (!token) {
    return next(new UnauthorizedError());
  }

  let payload;

  try {
    payload = jwt.verify(token, jwtSecret);
  } catch (err) {
    return next(new UnauthorizedError());
  }

  req.user = payload;

  return next();
};
