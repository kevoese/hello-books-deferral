import moment from 'moment';
import Book from '@models/Book';
import LendingRequest from '@models/LendingRequest';

export const duplicateRequest = async (req, res, next) => {
    const { id } = req.user;
    const duplicateBooks = await LendingRequest.query()
        .where('book', req.params.id)
        .where('user', id)
        .where('returned', false)
        .first();

    if (duplicateBooks) {
        return res.status(403).jerror({
            message: 'You have already borrowed this book'
        });
    }

    next();
};

export const checkAvailiability = async (req, res, next) => {
    const { role } = req.user;

    const bookExists = await Book.query().findById(req.params.id);
    if (!bookExists) {
        return res.status(404).jerror({
            message:
                'Not Found, Library does not have any book with the specified id'
        });
    }

    const copiesAvailable = bookExists.copiesAvailable;

    const copiesBorrowed = await LendingRequest.query()
        .where('book', req.params.id)
        .where('returned', false);

    if (copiesBorrowed && copiesAvailable === copiesBorrowed.length) {
        return res.status(404).jerror({
            message:
                'No copy of this book is available at the moment, please check back later'
        });
    }
    next();
};

export const borrowLimit = async (req, res, next) => {
    const { id, email, role } = req.user;

    const borrowedBooks = await LendingRequest.query()
        .where('user', id)
        .where('returned', false);

    if (borrowedBooks && borrowedBooks.length >= 3 && role === 'patron') {
        return res.status(400).jerror({
            message: 'You have reached the maximum borrow limit of 3'
        });
    }
    next();
};

export const withBook = async (req, res, next) => {
    const { id } = req.user;
    const bookId = req.params.id;
    const { days } = req.body;

    const hasBook = await LendingRequest.query()
        .where('user', id)
        .where('book', bookId)
        .where('returned', false)
        .first();

    if (!hasBook) {
        return res.status(404).jerror({
            message: 'You do not have this book with you'
        });
    }

    if (moment(hasBook.returnDate) < moment(new Date())) {
        return res.status(400).jerror({
            message:
                'You already exceeded the return date before making this request, Please return the book to the library and make a new request'
        });
    }

    if (hasBook && days > 7) {
        return res.status(400).jerror({
            message: 'You cannot extend a book for more than 7 days at a time'
        });
    }

    if (hasBook && hasBook.timesExtended === 3) {
        return res.status(400).jerror({
            message:
                'You cannot extend a borrow request more than 3 times, please return this book'
        });
    }

    req.user.lendId = hasBook.id;
    req.user.oldReturnDate = hasBook.returnDate;
    req.user.timesExtended = hasBook.timesExtended;

    next();
};

export default { duplicateRequest, checkAvailiability, borrowLimit, withBook };
