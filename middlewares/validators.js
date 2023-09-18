const { celebrate, Joi } = require('celebrate');
const validator = require('validator');

const urlValidator = (value, helpers) => {
  if (!validator.isURL(value)) {
    return helpers.message(`Значение ${value} не является ссылкой`);
  }

  return value;
};

const createMovieValidator = {
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().required().custom(urlValidator),
    trailerLink: Joi.string().required().custom(urlValidator),
    thumbnail: Joi.string().required().custom(urlValidator),
    movieId: Joi.number().required(),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
  }),
};

const deleteMovieValidator = {
  params: Joi.object().keys({
    movieId: Joi.string().hex().length(24),
  }),
};

const signUpValidator = {
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(4),
    name: Joi.string().required().min(2).max(30),
  }),
};

const signInValidator = {
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(4),
  }),
};

const updateUserValidator = {
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    email: Joi.string().email(),
    password: Joi.string().min(4),
  }),
};

const validate = (schema) => celebrate(schema, { abortEarly: false });

module.exports = {
  createMovieValidator,
  deleteMovieValidator,
  signUpValidator,
  updateUserValidator,
  signInValidator,
  validate,
};
