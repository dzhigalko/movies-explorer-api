const Movie = require('../models/movie');
const constants = require('../utils/constants');
const NotFoundError = require('../utils/NotFoundError');
const ForbiddenError = require('../utils/ForbiddenError');

const getCurrentUserMovies = (req, res, next) => {
  const { _id: userId } = req.user;

  Movie.find({ owner: userId })
    .then((movies) => res.send(movies))
    .catch(next);
};

const createMovie = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
  } = req.body;
  const { _id: userId } = req.user;

  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
    owner: userId,
  })
    .then((card) => {
      res.status(constants.HTTP_CREATED).send(card);
    })
    .catch(next);
};

const deleteMovie = (req, res, next) => {
  const { movieId } = req.params;
  const { _id: userId } = req.user;

  Movie.findById(movieId)
    .orFail(() => new NotFoundError(constants.MovieNotFoundMessage))
    .then((movie) => {
      if (movie.owner.toString() !== userId) {
        return Promise.reject(new ForbiddenError(constants.UserUnauthorizedToDeleteMovieMessage));
      }

      return movie;
    })
    .then((movie) => Movie.deleteOne(movie))
    .then((movie) => res.send(movie))
    .catch(next);
};

module.exports = {
  getCurrentUserMovies,
  createMovie,
  deleteMovie,
};
