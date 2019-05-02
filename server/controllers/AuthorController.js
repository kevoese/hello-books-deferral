
/* eslint-disable require-jsdoc */
const Author = require('../models/Author');

class AuthorController {
  static async create(req, res) {
    const { name } = req.body;
    const response = await Author.create(name);
    return res.status(response.status).send(response);
  }
}

module.exports = AuthorController;
