const jwt = require('jsonwebtoken');
const User = require('../models/user');
const NotFoundError = require('../utils/NotFoundError');
const constants = require('../utils/constants');

const signUp = (req, res, next) => {
  const {
    name, email, password,
  } = req.body;

  User.create({
    name, email, password,
  })
    .then((user) => {
      const userObject = user.toObject();
      delete userObject.password;

      res.status(constants.HTTP_CREATED).send(userObject);
    })
    .catch(next);
};

const signIn = (req, res, next) => {
  const { jwtSecret, jwtTTL, cookieTTL } = req;
  const { email, password } = req.body;

  User.authenticate(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, jwtSecret, { expiresIn: jwtTTL });

      res.cookie('token', token, {
        maxAge: cookieTTL,
        httpOnly: true,
      });

      res.send({});
    })
    .catch(next);
};

const updateCurrentUser = (req, res, next) => {
  const { _id: userId } = req.user;
  const { name } = req.body;

  User.findByIdAndUpdate(userId, { name }, { runValidators: true, new: true })
    .orFail(() => new NotFoundError('User not found'))
    .then((user) => {
      res.send(user);
    })
    .catch(next);
};

const getCurrentUser = (req, res, next) => {
  const { _id: userId } = req.user;

  User.findById(userId)
    .orFail(() => new NotFoundError('User not found'))
    .then((user) => {
      res.send(user);
    })
    .catch(next);
};

module.exports = {
  signUp,
  signIn,
  updateCurrentUser,
  getCurrentUser,
};
