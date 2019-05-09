const { Model } = require("objection");
const Author = require("./Author");

class Book extends Model {
  static get tableName() {
    return "books";
  }

  static relationMappings() {
    return {
      book: {
        relation: Model.ManyToManyRelation,
        modelClass: Author,
        join: {
          from: "books.id",
          through: {
            from: "author_book.book",
            to: "author_book.author"
          },
          to: "authors.id"
        }
      }
    };
  }
}

module.exports = Book;
