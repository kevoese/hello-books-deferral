const User = require("../../models/User");
const jwt = require("jsonwebtoken");
const Mail = require("friendly-mail");
const dotenv = require("dotenv");
const crypto = require("crypto");

dotenv.config();
const signUp = async (req, res) => {
  const { firstName, lastName, password, email } = req.body;

  const verificationCode = crypto.randomBytes(16).toString("hex");
  console.log("verification code", verificationCode);
  const user = await User.query().insert({
    firstName,
    lastName,
    password,
    email,
    email_confirm_code: verificationCode
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
    .data({
      name: firstName,
      url: `${process.env.APP_URL}/api/v1/auth/verify/${verificationCode}`
    })
    .subject("Welcome Onboard")
    .send();

  res.status(201).jsend({
    message: "User registered",
    token
  });
};

const verifyEmail = async (req, res) => {
  const { verificationCode } = req.params;
  const user = await User.query()
    .where("email_confirm_code", verificationCode)
    .first();

  if (!user) {
    return res.status(400).jerror({
      error: "Bad Request"
    });
  }

  await User.query()
    .findById(user.id)
    .patch({ email_confirm_code: null });

  return res.status(200).jsend({
    message: "User verified"
  });
};

module.exports = { signUp, verifyEmail };
