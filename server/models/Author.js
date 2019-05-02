/* eslint-disable require-jsdoc */
const Model = require('./index');

class Author extends Model {
  static get tableName() {
    return 'authors';
  }

  static async create(val) {
    const name = { name: val };
    try {
      const res = await Author.query()
        .allowInsert('[name]').insert(name);
      return {
        status: 200,
        body: res,
      };
    } catch (error) {
      return {
        status: 500,
        error: 'An Error Occurred',
      };
    }
  }
}

module.exports = Author;
