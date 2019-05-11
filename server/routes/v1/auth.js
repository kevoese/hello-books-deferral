import express from 'express';
import Validator from '@validators/authValidator';
import authController from '@controllers/authController';
import Auth from '@middleware/auth/authenticate';

const router = express.Router();

router.post('/signup', Validator.signUp, authController.signUp);
router.post('/verify/:verificationCode', authController.verifyEmail);
router.post(
    '/create-user',
    Auth.isAuthenticated,
    Auth.isSuperAdmin,
    Validator.createUser,
    authController.createUser
);

export default router;
