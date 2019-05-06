const Author = require("../../models/Author");

const addAuthor = async (req, res) => {
  const { name } = req.body;
  const author = await Author.query().insert({ name });
  return res.status(201).jsend(author);
};

module.exports = { addAuthor };
