const Author = require("../../models/Author");

const addAuthor = async (req, res) => {
  const { name } = req.body;
  const author = await Author.query().insert({ name });
  return res.status(201).jsend(author);
};

const getAuthor = async (req, res) => {
  /* get single author with the 'name' query string or all authors */
  const authors = !req.query.name
    ? await Author.query()
    : await Author.query().where("name", req.query.name);
  return res.status(200).jsend(authors);
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

module.exports = { addAuthor, getAuthor, updateAuthor, deleteAuthor };
