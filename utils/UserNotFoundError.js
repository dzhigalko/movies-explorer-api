const constants = require('./constants');

class UserNotFoundError extends Error {
  constructor(message) {
    super(message || constants.UserNotFoundMessage);
  }
}

module.exports = UserNotFoundError;
