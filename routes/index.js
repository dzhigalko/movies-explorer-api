const express = require('express');
const auth = require('../middlewares/auth');
const usersRouter = require('./users');
const moviesRouter = require('./movies');
const {
  signIn,
  signUp,
} = require('../controllers/users');
const {
  signInValidator,
  signUpValidator,
  validate,
} = require('../middlewares/validators');

const router = express.Router();

router.post('/signin', validate(signInValidator), signIn);
router.post('/signup', validate(signUpValidator), signUp);
router.use('/users', auth, usersRouter);
router.use('/movies', auth, moviesRouter);

module.exports = router;
