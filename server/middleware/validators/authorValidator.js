import { validateAll, sanitize } from 'indicative';
import { validatorInstance, messages } from '@utils/validationUtils';

const addAuthor = (req, res, next) => {
    const rules = {
        name: 'required|string'
    };
    let data = req.body;
    data = sanitize(data, { name: 'trim' });
    const messages = {
        required: '{{ field }} is required to create an author'
    };

    validateAll(data, rules, messages)
        .then(() => {
            next();
        })
        .catch(errors => {
            res.status(422).jerror('ValidationFailed', errors);
        });
};

const getAllAuthorsValidation = (req, res, next) => {
    const rules = {
        page: 'number',
        limit: 'number'
    };

    const data = req.query;
    const messages = {
        number: '{{ field }} is expected to be a an integer'
    };

    validatorInstance
        .validateAll(data, rules, messages)
        .then(() => {
            next();
        })
        .catch(errors => {
            res.status(422).jerror('ValidationFailed', errors);
        });
};

const updateAuthor = (req, res, next) => {
    const rules = {
        name: 'required|string',
        id: 'required|number|itExists:authors,id'
    };
    let data = req.body;
    data = sanitize(data, { name: 'trim' });
    data.id = req.params.id;

    validatorInstance
        .validateAll(data, rules, messages)
        .then(() => {
            next();
        })
        .catch(errors => {
            res.status(422).jerror('ValidationFailed', errors);
        });
};

const deleteOrGetAuthor = (req, res, next) => {
    const rules = {
        id: 'required|number|itExists:authors,id'
    };
    const data = req.params;

    validatorInstance
        .validateAll(data, rules, messages)
        .then(() => {
            next();
        })
        .catch(errors => {
            res.status(422).jerror('ValidationFailed', errors);
        });
};

export default {
    addAuthor,
    updateAuthor,
    deleteOrGetAuthor,
    getAllAuthorsValidation
};
