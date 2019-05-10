import express from 'express';
import fineValidator from '@validators/fineValidator';
import fineController from '@controllers/fineController';
import { isAuthenticated, isAdmin } from '@middleware/auth/authenticate';

const router = express.Router();

router.post(
    '/:userId',
    isAuthenticated,

    fineValidator.addFine,
    fineController.addFine
);

router.get(
    '/:fineId',
    isAuthenticated,

    fineValidator.checkId,
    fineController.getFine
);

router.delete(
    '/:fineId',
    isAuthenticated,

    fineValidator.checkId,
    fineController.deleteFine
);

export default router;
