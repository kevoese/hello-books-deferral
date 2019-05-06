const User = require("../../models/User");
const jwt = require("jsonwebtoken");
const Mail = require("friendly-mail");

const signUp = async (req, res) => {
  const { firstName, lastName, password, email } = req.body;

  const user = await User.query().insert({
    firstName,
    lastName,
    password,
    email
  });

  const token = jwt.sign(
    { id: user.id, email: user.email },
    process.env.JWT_SECRET,
    {
      expiresIn: "12h"
    }
  );

  // send user a welcome mail
  await new Mail("welcome-mail")
    .to(email, firstName)
    .subject("Welcome Onboard")
    .send();

  res.status(201).jsend({
    message: "User registered",
    token
  });
};

module.exports = { signUp };
