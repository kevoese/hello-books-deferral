import express from 'express';
import authValidator from '@validators/authValidator';
import authController from '@controllers/authController';
import Auth from '@middleware/auth/authenticate';

const router = express.Router();

router.post('/signup', authValidator.signUp, authController.signUp);
router.post('/verify/:verificationCode', authController.verifyEmail);
router.post(
    '/create-user',
    Auth.isAuthenticated,
    Auth.isSuperAdmin,
    authValidator.createUser,
    authController.createUser
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
