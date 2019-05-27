import Book from '@models/Book';
import AuthorBook from '@models/AuthorBook';
import LendingRequest from '@models/LendingRequest';
import moment from 'moment';

const storeBooks = async (req, res) => {
    const {
        title,
        coverType,
        description,
        isbn,
        price,
        publisher,
        year,
        copiesAvailable,
        authors = []
    } = req.body;

    const book = await Book.query().insert({
        title,
        coverType,
        description,
        isbn,
        price,
        publisher,
        year,
        copiesAvailable
    });

    await book.attach(authors);

    return res
        .status(201)
        .jsend({ message: 'Book has been added to the library', book });
};

const getAllBooks = async (req, res) => {
    const { page, limit } = req.query;

    const books = await Book.query()
        .eager('authors')
        .select()
        .page(page || 1, limit || 10);

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

    if (book) {
        return res.status(200).jsend(book);
    } else {
        return res.status(404).jsend({
            message: "Book requested doesn't exist"
        });
    }
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
    const { id, email } = req.user;

    await LendingRequest.query().insert({
        user: id,
        book: req.params.id,
        status: 'pending',
        requestDate: moment(new Date())
    });

    return res.status(200).jsend({
        message: 'Request received, you would be notified when approved'
    });
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
