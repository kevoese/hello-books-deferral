
/* eslint-disable require-jsdoc */

class AuthorController {
  static async create(req, res) {
    console.log('==', req.body);
    const { name } = req.body;
    console.log('here');
    return res.status(200).send(name);
  }
}

module.exports = AuthorController;
