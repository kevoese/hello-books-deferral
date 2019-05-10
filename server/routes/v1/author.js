import express from 'express';
import AuthorValidator from '@validators/authorValidator';
import AuthorController from '@controllers/authorController';

const router = express.Router();

router.post('/', AuthorValidator.addAuthor, AuthorController.addAuthor);

router.get(
    '/:id',
    AuthorValidator.deleteOrGetAuthor,
    AuthorController.getSingleAuthor
);

router.patch(
    '/:id',
    AuthorValidator.updateAuthor,
    AuthorController.updateAuthor
);

router.delete(
    '/:id',
    AuthorValidator.deleteOrGetAuthor,
    AuthorController.deleteAuthor
);

export default router;
