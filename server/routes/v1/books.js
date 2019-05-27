import express from 'express';
import bookValidator from '@validators/bookValidator';
import bookController from '@controllers/bookController';
import authenticate from '@auth/authenticate';
import bookRequest from '@book/bookRequest';

const router = express.Router();

router.post(
    '/',
    bookValidator.addBook,
    authenticate.isAuthenticated,
    authenticate.isAdmin,
    bookController.storeBooks
);

router.get(
    '/',
    bookValidator.getAllBooksValidation,
    bookController.getAllBooks
);

router.post(
    '/:bookId/borrow',
    bookValidator.borrowBook,
    authenticate.isAuthenticated,
    authenticate.isPatron,
    bookRequest.duplicateRequest,
    bookRequest.checkAvailiability,
    bookRequest.borrowLimit,
    bookController.requestBook
);

router.post('/', bookValidator.addBook, bookController.storeBooks);

router.get(
    '/',
    bookValidator.getAllBooksValidation,
    bookController.getAllBooks
);

router.get(
    '/borrow',
    authenticate.isAuthenticated,
    authenticate.isPatron,
    bookController.borrowedBooks
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
    authenticate.isMaybeAuthenticated,
    bookController.getSingleBook
);

router.delete(
    '/:id',
    bookValidator.getBookValidation,
    bookController.deleteSingleBook
);

export default router;
