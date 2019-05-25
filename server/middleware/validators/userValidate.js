import { validateAll, sanitize } from 'indicative';
import { equals } from 'indicative/builds/validations';

const update = (req, res, next) => {
    const rules = {
        firstName: 'required|alpha',
        lastName: 'required|alpha'
    };
    let data = req.body;
    data = sanitize(data, { name: 'trim' });
    const messages = {
        required: '{{ field }} is required to update the users'
    };

    validateAll(data, rules, messages)
        .then(() => {
            next();
        })
        .catch(errors => {
            res.status(422).jerror('ValidationFailed', errors);
        });
};

const accessLevel = (req, res, next) => {
    const rules = {
        role: 'required|string|in:patron,super_admin,admin'
    };

    let data = req.body;

    data = sanitize(data, { role: 'trim' });

    const messages = {
        required: '{{ field }} is required to update the users',
        in: '{{field}} has to be admin super admin or patron'
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
    update,
    accessLevel
};
