const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const UserNotFoundError = require('../utils/UserNotFoundError');
const constants = require('../utils/constants');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: [2, 'Длина поля "name" должна быть больше 2 символов'],
    maxlength: [30, 'Длина поля "name" должна быть меньше 30 символов'],
  },
  email: {
    type: String,
    unique: [true, 'Пользователь с email {VALUE} уже существует'],
    required: [true, 'Поле "email" является обязательным'],
    validate: {
      validator: validator.isEmail,
      message: (props) => `${props.value} не является email`,
    },
  },
  password: {
    type: String,
    required: [true, 'Поле "password" является обязательным'],
    select: false,
  },
}, { versionKey: false });

const hashPassword = (password) => bcrypt.genSalt(10)
  .then((salt) => bcrypt.hash(password, salt));

userSchema.pre('save', function save(next) {
  const user = this;

  if (!user.isModified('password')) {
    return next();
  }

  return hashPassword(user.password)
    .then((hash) => {
      user.password = hash;
      return next();
    })
    .catch(next);
});

userSchema.pre('findOneAndUpdate', function findOneAndUpdate(next) {
  const user = this.getUpdate();

  if (!user.password) {
    return next();
  }

  return hashPassword(user.password)
    .then((hash) => {
      user.password = hash;
      return next();
    })
    .catch(next);
});

userSchema.statics.authenticate = function authenticate(email, password) {
  return this.findOne({ email }).select('+password')
    .orFail(() => new UserNotFoundError(constants.WrongEmailOrPasswordMessage))
    .then((user) => bcrypt.compare(password, user.password)
      .then((matched) => {
        if (!matched) {
          return Promise.reject(new UserNotFoundError(constants.WrongEmailOrPasswordMessage));
        }

        return user;
      }));
};

module.exports = mongoose.model('user', userSchema);
