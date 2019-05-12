import Book from '@models/Book';
import LendingRequest from '@models/LendingRequest';

const storeBooks = async (req, res) => {
    const {
        title,
        coverType,
        description,
        isbn,
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
    const books = await Book.query().select();

    return res.status(200).jsend(books);
};

const getSingleBook = async (req, res) => {
    const book = await Book.query().findById(req.params.id);

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
        requestDate: new Date()
    });

    return res.status(200).jsend({
        message: 'Request received, you would be notified when approved'
    });
};

const decideBookRequest = async (req, res) => {
    const { id, email } = req.user;

    await LendingRequest.query()
        .patch({
            status: 'approved',
            approvedDate: new Date(),
            returned: false,
            returnDate: new Date(new Date().setDate(new Date().getDate() + 30))
        })
        .where('user', req.params.userId)
        .where('book', req.params.id);

    return res.status(200).jsend({
        message: 'Book request approved'
    });
};

const extendBorrow = async (req, res) => {
    const { lendId, oldReturnDate } = req.user;

    await LendingRequest.query().patchAndFetchById(lendId, {
        returnDate: new Date(
            oldReturnDate.setDate(oldReturnDate.getDate() + req.body.days)
        )
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
    decideBookRequest,
    extendBorrow
};
