const express = require('express');
const {
  updateCurrentUser,
  getCurrentUser,
} = require('../controllers/users');
const {
  updateUserValidator,
  validate,
} = require('../middlewares/validators');

const router = express.Router();

router.get('/me', getCurrentUser);
router.patch('/me', validate(updateUserValidator), updateCurrentUser);

module.exports = router;
