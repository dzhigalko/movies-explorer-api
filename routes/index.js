const express = require('express');
const auth = require('../middlewares/auth');
const usersRouter = require('./users');
const moviesRouter = require('./movies');
const {
  signIn,
  signUp,
  signOut,
} = require('../controllers/users');
const {
  signInValidator,
  signUpValidator,
  validate,
} = require('../middlewares/validators');
const NotFoundError = require('../utils/NotFoundError');

const router = express.Router();

router.post('/signin', validate(signInValidator), signIn);
router.post('/signup', validate(signUpValidator), signUp);
router.post('/signout', auth, signOut);
router.use('/users', auth, usersRouter);
router.use('/movies', auth, moviesRouter);
router.use(auth, (req, _, next) => next(new NotFoundError()));

module.exports = router;
