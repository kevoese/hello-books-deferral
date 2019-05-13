import Author from '@models/Author';

const addAuthor = async (req, res) => {
    const { name } = req.body;
    const author = await Author.query().insert({ name });
    return res.status(201).jsend(author);
};

const getAllAuthors = async (req, res) => {
    const { page, limit } = req.query;

    const authors = await Author.query()
        .select()
        .page(page || 1, limit || 10);

    return res.status(200).jsend(authors);
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
    return res.status(200).jsend({ message: 'Author deleted successfully' });
};

export default {
    addAuthor,
    getAllAuthors,
    getSingleAuthor,
    updateAuthor,
    deleteAuthor
};
