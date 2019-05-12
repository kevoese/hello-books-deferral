import express from 'express';
import bookValidator from '@validators/bookValidator';
import bookController from '@controllers/bookController';
import authenticate from '@auth/authenticate';
import bookRequest from '@book/bookRequest';

const router = express.Router();

router.post('/', bookValidator.addBook, bookController.storeBooks);

router.get('/', bookController.getAllBooks);

router.get(
    '/:id/borrow',
    bookValidator.getBookValidation,
    authenticate.isAuthenticated,
    authenticate.isPatron,
    bookRequest.duplicateRequest,
    bookRequest.checkAvailiability,
    bookRequest.borrowLimit,
    bookController.requestBook
);

router.patch(
    '/:id/lend/:userId',
    bookValidator.bookUserValidation,
    authenticate.isAuthenticated,
    authenticate.isAdmin,
    bookRequest.checkAvailiability,
    bookRequest.borrowLimit,
    bookController.decideBookRequest
);

router.patch(
    '/:id/extend',
    bookValidator.extendBorrow,
    authenticate.isAuthenticated,
    authenticate.isPatron,
    bookRequest.withBook,
    bookController.extendBorrow
);

router.get(
    '/:id',
    bookValidator.getBookValidation,
    bookController.getSingleBook
);

router.delete(
    '/:id',
    bookValidator.getBookValidation,
    bookController.deleteSingleBook
);

export default router;
