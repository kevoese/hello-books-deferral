import express from 'express';
import Auth from '@middleware/auth/authenticate';
import NotificationValidator from '@validators/notificationValidator';
import NotificationController from '@controllers/notificationController';

const router = express.Router();

router.get(
    '/:email',
    NotificationValidator.getAllUserNotification,
    Auth.isAuthenticated,
    NotificationController.getAllUserNotification
);

router.get(
    '/:email/:id',
    NotificationValidator.getSpecificUserNotification,
    Auth.isAuthenticated,
    NotificationController.getSpecificUserNotification
);

export default router;
