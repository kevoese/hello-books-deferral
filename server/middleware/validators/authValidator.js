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
        firstName: 'string|required',
        lastName: 'string|required',
        email: 'required|string|email|unique:users,email',
        password: 'required|min:8|alpha_numeric|confirmed'
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

const getResetPage = async (req, res, next) => {
    const { token } = req.params;
    const row = await User.query()
        .where('resettoken', token)
        .where('resetexpire', '>', new Date());
    req.user = row[0];
    if (req.user) return next();
    res.status(422).jerror('ValidationFailed', [
        {
            message: 'reset token is invalid'
        }
    ]);
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
        password: 'required|min:8|alpha_numeric|confirmed'
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

export default { signUp, getResetPage, sendResetLink, resetPassword };
