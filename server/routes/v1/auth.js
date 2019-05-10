import express from "express";
import Validator from "@validators/authValidator";
import authController from "@controllers/authController";

const router = express.Router();

router.post("/signup", Validator.signUp, authController.signUp);
router.post("/verify/:verificationCode", authController.verifyEmail);

export default router;
