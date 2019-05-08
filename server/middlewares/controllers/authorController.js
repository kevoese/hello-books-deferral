const Author = require("../../models/Author");

const addAuthor = async (req, res) => {
  const { name } = req.body;
  const author = await Author.query().insert({ name });
  return res.status(201).jsend(author);
};

const getSingleAuthor = async (req, res) => {
  const author = await Author.query().findById(req.params.id);
  return res.status(200).jsend(author);
};

const updateAuthor = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  const author = await Author.query().patchAndFetchById(id, { name });
  return res.status(200).jsend(author);
};

const deleteAuthor = async (req, res) => {
  const { id } = req.params;
  await Author.query().deleteById(id);
  return res.status(200).jsend({ message: "Author deleted successfully" });
};

module.exports = { addAuthor, getSingleAuthor, updateAuthor, deleteAuthor };
