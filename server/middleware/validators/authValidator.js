import { sanitize } from 'indicative';

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
/* add other auth validators here */
export default { signUp };
