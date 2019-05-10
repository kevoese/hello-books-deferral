import express from 'express';
import fineValidator from '@validators/fineValidator';
import fineController from '@controllers/fineController';
import { isAuthenticated, isAdmin } from '@middleware/auth/authenticate';

const router = express.Router();

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

router.delete(
    '/:fineId',
    isAuthenticated,
    isAdmin,
    fineValidator.checkId,
    fineController.deleteFine
);

export default router;
