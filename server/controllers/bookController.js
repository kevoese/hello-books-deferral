import Paystack from 'paystack';
import config from '@config';
import Book from '@models/Book';
import LendingRequest from '@models/LendingRequest';
import moment from 'moment';

const paystack = Paystack(config.paystack.secret);

const storeBooks = async (req, res) => {
    const {
        title,
        coverType,
        coverImage,
        description,
        isbn,
        price,
        publisher,
        year,
        copiesAvailable,
        authors
    } = req.body;

    const book = await Book.query().insert({
        title,
        coverType,
        description,
        isbn,
        price,
        publisher,
        year,
        coverImage,
        copiesAvailable
    });

    await book.attach(authors || []);

    return res
        .status(201)
        .jsend({ message: 'Book has been added to the library', book });
};

const getAllBooks = async (req, res) => {
    const { page, limit } = req.query;

    const books = await Book.query()
        .orderBy('id', 'DESC')
        .eager('authors')
        .select()
        .page(page || 0, limit || 10);

    return res.status(200).jsend(books);
};

const borrowedBooks = async (req, res) => {
    const borrowed = await LendingRequest.query()
        .where('user', req.user.id)
        .where('returned', false);
    const bookIds = borrowed.map(request => request.book);
    const books = await Book.query().whereIn('id', bookIds);
    const allBorrowedBooks = books.map(book => {
        const request = borrowed.find(request => request.book === book.id);
        const status = new Date() > request.returnDate ? 'expired' : 'active';
        return { ...book, dueDate: request.returnDate, status };
    });
    return res.status(200).jsend(allBorrowedBooks);
};

const getSingleBook = async (req, res) => {
    const book = await Book.query()
        .eager('authors')
        .findById(req.params.id);

    if (!book) {
        return res.status(404).jsend({
            message: "Book requested doesn't exist"
        });
    }

    let canBorrowBook = false;

    let lendingRequestForBook = false;

    let maxBorrowLimitReached = false;

    if (req.user) {
        lendingRequestForBook = await LendingRequest.query()
            .where('user', req.user.id)
            .where('book', book.id)
            .where('returned', false)
            .first();

        const copiesAvailable = book.copiesAvailable;

        const copiesBorrowed = await LendingRequest.query()
            .where('book', book.id)
            .where('returned', false);

        const copiesBorrowedForUser = await LendingRequest.query()
            .where('user', req.user.id)
            .where('returned', false);

        maxBorrowLimitReached = (copiesBorrowedForUser || []).length >= 3;
        canBorrowBook =
            !lendingRequestForBook &&
            (copiesBorrowedForUser || []).length < 3 &&
            (copiesBorrowed || []).length < parseInt(copiesAvailable);
    }

    return res.status(200).jsend({
        ...book,
        canBorrowBook,
        existingBookRequest: !!lendingRequestForBook,
        maxBorrowLimitReached
    });
};

const deleteSingleBook = async (req, res) => {
    const book = await Book.query().deleteById(req.params.id);

    if (book > 0) {
        return res.status(200).jsend({
            message: 'Book succesfully deleted'
        });
    } else {
        return res.status(404).jsend({
            message: "Book requested doesn't exist"
        });
    }
};

const requestBook = async (req, res) => {
    const { id } = req.user;

    try {
        const transaction = await paystack.transaction.verify(
            req.body.reference
        );

        if (!transaction.status) throw new Error();

        await LendingRequest.query().insert({
            user: id,
            book: req.params.bookId,
            requestDate: moment(new Date()),
            returned: false,
            returnDate: moment(
                new Date(new Date().setDate(new Date().getDate() + 30))
            )
        });

        return res.status(200).jsend({
            message: 'Request completed successfully.'
        });
    } catch (e) {
        return 'Payment verification failed';
    }
};

const extendBorrow = async (req, res) => {
    const { lendId, oldReturnDate, timesExtended } = req.user;

    await LendingRequest.query().patchAndFetchById(lendId, {
        returnDate: moment(
            new Date(
                oldReturnDate.setDate(oldReturnDate.getDate() + req.body.days)
            )
        ),
        timesExtended: timesExtended + 1
    });

    return res.status(200).jsend({
        message: `You have successfully extended the return of this book by ${
            req.body.days
        } days`
    });
};

export default {
    storeBooks,
    getAllBooks,
    getSingleBook,
    deleteSingleBook,
    requestBook,
    extendBorrow,
    borrowedBooks
};
