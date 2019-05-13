import express from 'express';
import userValidate from '@validators/userValidate';
import userController from '@controllers/userController';
import Auth from '@middleware/auth/authenticate';

const router = express.Router();

router.get(
    '/',
    Auth.isAuthenticated,
    Auth.isSuperAdmin,
    userController.getAllUsers
);

router.patch(
    '/update/:user_id',
    userValidate.update,
    Auth.isAuthenticated,
    Auth.isSuperAdmin,
    Auth.userExists,
    userController.update
);

router.delete(
    '/:user_id',
    Auth.isAuthenticated,
    Auth.isSuperAdmin,
    Auth.userExists,
    userController.remove
);

router.patch(
    '/change-access-level/:user_id',
    userValidate.accessLevel,
    Auth.isAuthenticated,
    Auth.isSuperAdmin,
    Auth.userExists,
    userController.changeAccessLevel
);

export default router;
