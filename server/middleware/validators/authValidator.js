import { validateAll, sanitize } from 'indicative';
import User from '@models/User';

import {
    validatorInstance,
    messages,
    sanitizeRules
} from '@utils/validationUtils';

const signUp = (req, res, next) => {
    /* create validation rule for request fields */
    const rules = {
        firstName: 'alpha|required',
        lastName: 'alpha|required',
        email: 'required|string|email|unique:users,email',
        password: 'required|min:8|alpha_numeric'
    };
    /* sanitize data object */
    let data = req.body;
    data = sanitize(data, sanitizeRules);
    /* validate all fields using the custom validator */
    validatorInstance
        .validateAll(data, rules, messages)
        .then(() => {
            next();
        })
        .catch(errors => {
            res.status(422).jerror('ValidationFailed', errors);
        });
};

const login = async (req, res, next) => {
    const rules = { email: 'required|email', password: 'required' };

    let data = req.body;
    data = sanitize(data, { email: 'trim' });

    try {
        await validateAll(data, rules, messages);

        return next();
    } catch (errors) {
        res.status(422).jerror('ValidationFailed', errors);
    }
};

const sendResetLink = (req, res, next) => {
    const rules = { email: 'required|email' };
    let data = req.body;
    data = sanitize(data, { email: 'trim' });

    validateAll(data, rules, messages)
        .then(async () => {
            const row = await User.query().where('email', data.email);
            req.user = row[0];
            if (req.user) return next();
            res.status(404).jerror('ValidationFailed', [
                {
                    message: 'email does not exist'
                }
            ]);
        })
        .catch(errors => {
            res.status(422).jerror('ValidationFailed', errors);
        });
};

const resetPassword = (req, res, next) => {
    const rules = {
        token: 'required',
        password: 'required|min:8|alpha_numeric'
    };
    const data = req.body;

    validateAll(data, rules, messages)
        .then(async () => {
            const row = await User.query()
                .where('resettoken', data.token)
                .where('resetexpire', '>', new Date());
            req.user = row[0];
            if (req.user) return next();
            res.status(422).jerror('ValidationFailed', [
                {
                    message: 'reset token is invalid'
                }
            ]);
        })
        .catch(errors => {
            res.status(422).jerror('ValidationFailed', errors);
        });
};

const createUser = (req, res, next) => {
    const rules = {
        firstName: 'alpha|required',
        lastName: 'alpha|required',
        email: 'required|string|email|unique:users,email'
    };
    let data = req.body;
    data = sanitize(data, sanitizeRules);
    /* validate all fields using the custom validator */
    validatorInstance
        .validateAll(data, rules, messages)
        .then(() => {
            next();
        })
        .catch(errors => {
            res.status(422).jerror('ValidationFailed', errors);
        });
};

/* add other auth validators here */
export default { signUp, login, sendResetLink, resetPassword, createUser };
