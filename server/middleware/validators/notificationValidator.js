import { validateAll, sanitize } from 'indicative';

const sendNotification = (req, res, next) => {
    const rules = {
        type: 'required|string',
        data: 'required|string'
    };
    let data = req.body;
    data = sanitize(data, { type: 'trim', data: 'trim' });
    const messages = {
        required: '{{ field }} is required'
    };

    validateAll(data, rules, messages)
        .then(() => {
            next();
        })
        .catch(errors => {
            res.status(422).jerror('ValidationFailed', errors);
        });
};

const getAllUserNotification = (req, res, next) => {
    const rules = {
        email: 'required|string|email'
    };
    let data = req.params.email;
    data = sanitize(data, { email: 'trim' });
    const messages = {
        required: '{{ field }} is required',
        email: '{{ field }} must be a valid'
    };

    validateAll(data, rules, messages)
        .then(() => {
            next();
        })
        .catch(errors => {
            res.status(422).jerror('ValidationFailed', errors);
        });
};
const getSpecificUserNotification = (req, res, next) => {
    const rules = {
        email: 'required|string|email',
        id: 'required|number'
    };
    let data = req.params;
    data = sanitize(data, { email: 'trim' });
    const messages = {
        required: '{{ field }} is required',
        email: '{{ field }} must be a valid',
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
    sendNotification,
    getAllUserNotification,
    getSpecificUserNotification
};
