import express from 'express';
import authValidator from '@validators/authValidator';
import authController from '@controllers/authController';

const router = express.Router();

router.post('/signup', authValidator.signUp, authController.signUp);
router.post('/verify/:verificationCode', authController.verifyEmail);

router.get(
    '/reset/:token',
    authValidator.getResetPage,
    authController.getResetPage
);
router.post(
    '/reset',
    authValidator.sendResetLink,
    authController.sendResetLink
);
router.patch(
    '/reset',
    authValidator.resetPassword,
    authController.resetPassword
);

export default router;
