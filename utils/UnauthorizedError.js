const constants = require('./constants');

class UnauthorizedError extends Error {
  constructor(message) {
    super(message || constants.AuthorizationRequiredMessage);
  }
}

module.exports = UnauthorizedError;
