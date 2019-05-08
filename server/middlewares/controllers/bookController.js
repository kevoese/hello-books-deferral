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

  return res.status(200).jsend({
    data: books
  });
};
module.exports = { storeBooks, getAllBooks };
