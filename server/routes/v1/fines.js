import express from 'express';
import fineValidator from '@validators/fineValidator';
import fineController from '@controllers/fineController';
import {
    isAuthenticated,
    isAdmin,
    isPatron
} from '@middleware/auth/authenticate';

const router = express.Router();

router.post(
    '/pay',
    isAuthenticated,
    isPatron,
    fineValidator.payFine,
    fineController.payFine
);

router.post(
    '/:userId',
    isAuthenticated,
    isAdmin,
    fineValidator.addFine,
    fineController.addFine
);

router.get(
    '/:fineId',
    isAuthenticated,
    isAdmin,
    fineValidator.checkId,
    fineController.getFine
);

router.get('/', isAuthenticated, fineController.getFines);

export default router;
