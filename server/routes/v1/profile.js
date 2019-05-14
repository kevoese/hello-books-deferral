import express from 'express';
import profileValidator from '@validators/profileValidator';
import profileController from '@controllers/profileController';
import { isAuthenticated } from '@middleware/auth/authenticate';

const router = express.Router();

router.get('/', isAuthenticated, profileController.getProfile);

router.get(
    '/:id',
    isAuthenticated,
    profileValidator.checkId,
    profileController.getProfile
);

router.patch(
    '/',
    isAuthenticated,
    profileValidator.editProfile,
    profileController.editProfile
);

export default router;
