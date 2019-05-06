const User = require("../../models/User");
const jwt = require("jsonwebtoken");

const signUp = async (req, res) => {
  const { firstName, lastName, password, email } = req.body;

  const user = await User.query().insert({
    firstName,
    lastName,
    password,
    email
  });

  if (user) {
    const { id, email } = user;

    const token = jwt.sign({ id, email }, process.env.JWT_SECRET, {
      expiresIn: "12h"
    });

    res.status(201).jsend({
      message: "User registered",
      token
    });
  } else {
    res.status(500).jsend({
      message: "Something went wrong. Please try again"
    });
  }
};

module.exports = { signUp };
