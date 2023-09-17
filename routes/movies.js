const express = require('express');
const {
  getCurrentUserMovies,
  createMovie,
  deleteMovie,
} = require('../controllers/movies');
const {
  createMovieValidator,
  deleteMovieValidator,
  validate,
} = require('../middlewares/validators');

const router = express.Router();
router.get('/', getCurrentUserMovies);
router.post('/', validate(createMovieValidator), createMovie);
router.delete('/:movieId', validate(deleteMovieValidator), deleteMovie);

module.exports = router;
