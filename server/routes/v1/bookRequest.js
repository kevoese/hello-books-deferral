import express from 'express';
import bookRequestController from '@controllers/bookRequestController';
import bookValidator from '@validators/bookValidator';
import Auth from '@middleware/auth/authenticate';

const router = express.Router();

router.post(
    '/',
    bookValidator.bookRequestValidate,
    Auth.isAuthenticated,
    bookRequestController.requestBook
);
router.get('/', Auth.isAuthenticated, bookRequestController.getAllRequests);

export default router;
