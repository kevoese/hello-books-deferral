import express from 'express';
import bookValidator from '@validators/bookValidator';
import bookController from '@controllers/bookController';

const router = express.Router();

router.post('/', bookValidator.addBook, bookController.storeBooks);

router.get('/', bookController.getAllBooks);

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
