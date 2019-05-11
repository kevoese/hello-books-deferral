import faker from 'faker';
import User from '@models/User';

export class Response {
    status() {
        return this;
    }

    jsend() {}
}

export const getUser = () => ({
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    email: faker.internet.email(),
    password_confirmation: 'secret0001',
    password: 'secret0001',
    settings: {
        email_notify: 1,
        in_app_notify: 1
    }
});

export const createUser = user =>
    User.query().insert({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        password: 'secret0001',
        settings: {
            email_notify: 1,
            in_app_notify: 0
        }
    });
