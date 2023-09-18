const constants = require('./constants');

class NotFoundError extends Error {
  constructor(message) {
    super(message || constants.NotFoundMessage);
  }
}

module.exports = NotFoundError;
