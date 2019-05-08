const express = require("express");
const Validator = require("../../middlewares/validators/authValidator");
const Controller = require("../../middlewares/controllers/authController");

const router = express.Router();

router.post("/signup", Validator.signUp, Controller.signUp);
router.post("/verify/:verificationCode", Controller.verifyEmail);

module.exports = router;
