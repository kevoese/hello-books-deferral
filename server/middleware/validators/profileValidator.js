import { validateAll, sanitize } from 'indicative';
import {
    sanitizeRules,
    messages,
    validatorInstance
} from '@utils/validationUtils';

const editProfile = async (req, res, next) => {
    const rules = {
        firstName: 'string',
        lastName: 'string',
        bio: 'string',
        email: 'string|email|unique:users,email',
        avatar: 'string'
    };

    req.body = sanitize(req.body, sanitizeRules);
    const { firstName, lastName, bio, email, avatar } = req.body;
    let data = { firstName, lastName, bio, email, avatar };

    const isEmpty = Object.values(data).find(element => element);

    if (!isEmpty)
        return res.status(422).jerror({
            message: 'Update at least a field'
        });

    try {
        await validateAll(data, rules, messages);

        return next();
    } catch (errors) {
        res.status(422).jerror('ValidationFailed', errors);
    }
};

const checkId = async (req, res, next) => {
    const rules = {
        id: 'number|itExists:users,id'
    };

    const data = req.params;
    const messages = {
        number: '{{ field }} is expected to be a an integer',
        'id.itExists': 'User Id does not exist'
    };

    try {
        await validateAll(data, rules, messages);

        return next();
    } catch (errors) {
        res.status(422).jerror('ValidationFailed', errors);
    }
};

export default { editProfile, checkId };
