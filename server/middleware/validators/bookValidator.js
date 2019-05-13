import { validateAll, sanitize } from 'indicative';

const addBook = (req, res, next) => {
    const rules = {
        title: 'required|string',
        coverType: 'required|string',
        description: 'required|string',
        isbn: 'required|string|unique:books,isbn',
        publisher: 'required|string',
        year: 'required|number',
        copiesAvailable: 'required|number'
    };

    const data = req.body;

    const messages = {
        required: '{{ field }} is required to create a book'
    };

    validateAll(data, rules, messages)
        .then(() => {
            next();
        })
        .catch(errors => {
            res.status(422).jerror('ValidationFailed', errors);
        });
};

const getBookValidation = (req, res, next) => {
    const rules = {
        id: 'required|number'
    };

    const data = req.params;
    const messages = {
        required: '{{ field }} is required to get a book',
        number: '{{ field }} is expected to be an integer'
    };

    validateAll(data, rules, messages)
        .then(() => {
            next();
        })
        .catch(errors => {
            res.status(422).jerror('ValidationFailed', errors);
        });
};

const bookUserValidation = (req, res, next) => {
    const rules = {
        id: 'required|number',
        userId: 'required|number'
    };

    const data = req.params;
    const messages = {
        required: '{{ field }} is required to approve or decline a book',
        number: '{{ field }} must be a number'
    };

    validateAll(data, rules, messages)
        .then(() => {
            next();
        })
        .catch(errors => {
            res.status(422).jerror('ValidationFailed', errors);
        });
};

const extendBorrow = (req, res, next) => {
    const rules = {
        days: 'required|number',
        id: 'required|number'
    };

    const data = {
        id: req.params.id,
        days: req.body.days
    };

    const messages = {
        required: '{{ field }} is required to extend request',
        number: '{{ field }} must be an integer'
    };

    validateAll(data, rules, messages)
        .then(() => {
            next();
        })
        .catch(errors => {
            res.status(422).jerror('ValidationFailed', errors);
        });
};
const bookRequestValidate = (req, res, next) => {
    const rules = {
        description: 'required|string'
    };

    let data = req.body;
    data = sanitize(data, { description: 'trim' });
    const messages = {
        required: '{{ field }} is required',
        string: '{{ field }} is expected to be a an integer'
    };

    validateAll(data, rules, messages)
        .then(() => {
            next();
        })
        .catch(errors => {
            res.status(422).jerror('ValidationFailed', errors);
        });
};

const getAllBooksValidation = (req, res, next) => {
    const rules = {
        page: 'number',
        limit: 'number'
    };

    const data = req.query;
    const messages = {
        number: '{{ field }} is expected to be a an integer'
    };

    validateAll(data, rules, messages)
        .then(() => {
            next();
        })
        .catch(errors => {
            res.status(422).jerror('ValidationFailed', errors);
        });
};

export default {
    addBook,
    getBookValidation,
    bookUserValidation,
    getAllBooksValidation,
    extendBorrow,
    bookRequestValidate
};
