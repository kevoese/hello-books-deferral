const { Model } = require("objection");

class Author extends Model {
  static get tableName() {
    return "authors";
  }
}

module.exports = Author;
