import moment from 'moment';
import Book from '@models/Book';
import LendingRequest from '@models/LendingRequest';

export const duplicateRequest = async (req, res, next) => {
    const { id } = req.user;
    const duplicateBooks = await LendingRequest.query()
        .where('book', req.params.id)
        .where('user', id)
        .where('status', 'pending' || 'approved')
        .first();

    if (duplicateBooks) {
        return res.status(403).json({
            message: 'You have already made a request for this book'
        });
    }

    next();
};

export const checkAvailiability = async (req, res, next) => {
    const { role } = req.user;

    const bookExists = await Book.query().findById(req.params.id);
    if (!bookExists) {
        return res.status(404).jsend({
            message:
                'Not Found, Library does not have any book with the specified id'
        });
    }

    const copiesAvailable = bookExists.copiesAvailable;

    const copiesBorrowed = await LendingRequest.query()
        .where('book', req.params.id)
        .where('status', 'approved')
        .where('returned', false);

    if (copiesBorrowed && copiesAvailable === copiesBorrowed.length) {
        if (role !== 'patron') {
            await LendingRequest.query()
                .patch({ status: 'rejected' })
                .where('user', req.params.userId)
                .where('book', req.params.id);
            // send notification to patron that request as been declined due to none availiability of books
        }
        return res.status(404).jsend({
            message:
                'No copy of this book is available at the moment, please check back later'
        });
    }
    next();
};

export const borrowLimit = async (req, res, next) => {
    const { id, email, role } = req.user;
    let userId;

    role != 'patron' ? (userId = req.params.userId) : (userId = id);

    const borrowedBooks = await LendingRequest.query()
        .where('user', userId)
        .where('status', 'approved')
        .where('returned', false);

    if (borrowedBooks && borrowedBooks.length >= 3 && role === 'patron') {
        return res.status(400).jsend({
            message: 'You have reached the maximum borrow limit of 3'
        });
    }
    if (borrowedBooks && borrowedBooks.length >= 3 && role !== 'patron') {
        await LendingRequest.query()
            .patch({ status: 'declined' })
            .where('user', req.params.userId)
            .where('book', req.params.id);
        // Send notification to the Patron regarding why the request was declined
        return res.status(400).jsend({
            message:
                'Request declined: Patron has reached the maximum borrow limit'
        });
    }
    next();
};

export const withBook = async (req, res, next) => {
    const { id } = req.user;
    const bookId = req.params.id;

    const hasBook = await LendingRequest.query()
        .where('user', id)
        .where('book', bookId)
        .where('status', 'approved')
        .where('returned', false)
        .first();

    if (!hasBook) {
        return res.status(404).jsend({
            message: 'You do not have any book with this id'
        });
    }

    if (moment(hasBook.returnDate) < moment(new Date())) {
        return res.status(400).jsend({
            message:
                'Return date already exceeded 30 days return limit, Please return the book to the library and make a new request'
        });
    }

    req.user.lendId = hasBook.id;
    req.user.oldReturnDate = hasBook.returnDate;

    next();
};

export default { duplicateRequest, checkAvailiability, borrowLimit, withBook };
