import { validateAll, sanitize } from 'indicative';
import { sanitizeRules, messages } from '@utils/validationUtils';

const editProfile = (req, res, next) => {
    const rules = {
        firstName: 'string',
        lastName: 'string',
        bio: 'string',
        email: 'string|email|unique:users,email',
        avatar: 'string'
    };

    req.body = sanitize(req.body, sanitizeRules);
    let data = req.body;
    const [isEmpty] = Object.keys(req.body);
    if (!isEmpty)
        return res.status(422).jerror({
            message: 'Update at least a field'
        });

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
        id: 'number|itExists:users,id'
    };

    const data = req.params;
    const messages = {
        number: '{{ field }} is expected to be a an integer',
        itExists: 'User Id does not exist'
    };

    validateAll(data, rules, messages)
        .then(() => {
            next();
        })
        .catch(errors => {
            res.status(422).jerror('ValidationFailed', errors);
        });
};

export default { editProfile, checkId };
