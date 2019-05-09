const Book = require("../../models/Book");

const storeBooks = async (req, res) => {
  const { title, coverType, description, isbn, publisher, year } = req.body;

  const book = await Book.query().insert({
    title,
    coverType,
    description,
    isbn,
    publisher,
    year
  });

  return res
    .status(201)
    .jsend({ message: "Book has been added to the library", book });
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
      message: "Book succesfully deleted"
    });
  } else {
    return res.status(404).jsend({
      message: "Book requested doesn't exist"
    });
  }
};

module.exports = { storeBooks, getAllBooks, getSingleBook, deleteSingleBook };
