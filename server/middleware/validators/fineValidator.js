import { validateAll, sanitize } from 'indicative';
import { sanitizeRules } from '@utils/validationUtils';
import consola from 'consola';

const addFine = (req, res, next) => {
    const rules = {
        type: 'required|string',
        description: 'required|string',
        amount: 'required|number',
        userId: 'required|number|itExists:users,id'
    };

    let data = req.body;
    data.userId = req.params.userId;
    const messages = {
        required: '{{ field }} is required to create a fine',
        number: '{{ field }} is expected to be a an integer',
        itExists: "User's Id does not exist"
    };

    /* sanitize data object */
    req.body = sanitize(req.body, sanitizeRules);

    validateAll(data, rules, messages)
        .then(() => {
            next();
        })
        .catch(errors => {
            res.status(422).jerror('ValidationFailed', errors);
        });
};

const getAllFines = (req, res, next) => {
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

const checkId = (req, res, next) => {
    const rules = {
        fineId: 'required|number|itExists:fines,id'
    };

    const data = req.params;
    const messages = {
        required: '{{ field }} is required to access a fine',
        number: '{{ field }} is expected to be a an integer',
        itExists: 'Fine Id does not exist'
    };

    validateAll(data, rules, messages)
        .then(() => {
            next();
        })
        .catch(errors => {
            res.status(422).jerror('ValidationFailed', errors);
        });
};

export default { addFine, checkId, getAllFines };
