const User = require('../../models/User');

const signUp = async (req, res) => {
  const {
    firstName, lastName, password, email
  } = req.body;

  await User.query()
    .insert({
      firstName, lastName, password, email
    });

  res.status(201).jsend({ message: 'User registered' });
}

module.exports = { signUp };