const { Model } = require("objection");

class Book extends Model {
  static tableName = "books";
}

module.exports = Book;
