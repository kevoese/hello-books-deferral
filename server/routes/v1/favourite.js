import express from 'express';
import favouriteController from '@controllers/favouriteController';
import Auth from '@middleware/auth/authenticate';

const router = express.Router();

router.post(
    '/author',
    Auth.isAuthenticated,
    Auth.authorExists,
    favouriteController.addFavouriteAuthor
);

router.delete(
    '/author/:author_id',
    Auth.isAuthenticated,
    favouriteController.unFavouriteAuthor
);

export default router;
