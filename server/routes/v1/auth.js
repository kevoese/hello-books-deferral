const express = require('express');
const validator = require('../../middlewares/validators/authValidator');
const User = require('../../models/User');

const router = express.Router();

router.post('/signup', validator.signUp, async (req, res) => {
  const {
    firstName, lastName, password, email
  } = req.body;

  await User.query()
    .insert({
      firstName, lastName, password, email
    });

  res.status(201).json([{ message: 'User registered' }]);
});

module.exports = router;
