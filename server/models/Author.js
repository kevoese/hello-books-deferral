const { Model } = require("objection");
const Book = require("./Book");

class Author extends Model {
  static get tableName() {
    return "authors";
  }

  static relationMappings() {
    return {
      book: {
        relation: Model.ManyToManyRelation,
        modelClass: Book,
        join: {
          from: "authors.id",
          through: {
            from: "author_book.author",
            to: "author_book.book"
          },
          to: "books.id"
        }
      }
    };
  }
}

module.exports = Author;
