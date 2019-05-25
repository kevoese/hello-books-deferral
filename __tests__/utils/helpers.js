import faker from 'faker';
import moment from 'moment';
import User from '@models/User';
import Author from '@models/Author';
import Fine from '@models/Fine';
import jwt from 'jsonwebtoken';
import config from '@config';

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
        },
        role: user.role || 'patron'
    });

export const createAuthor = () =>
    Author.query().insert({
        name: 'John Doe'
    });

export const approvedBook = (patronId, theBookId) => ({
    user: patronId,
    book: theBookId,
    status: 'approved',
    requestDate: moment(new Date()),
    approvedDate: moment(new Date()),
    returned: false,
    returnDate: moment(new Date(new Date().setDate(new Date().getDate() + 30)))
});

export const superAdminUser = user =>
    User.query().insert({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        password: 'secret0001',
        role: 'super_admin',
        settings: {
            email_notify: 0,
            in_app_notify: 1
        }
    });

export const getFine = user_id => ({
    description: 'Fighting with book',
    amount: 50000,
    type: 'BOOK_DAMAGING',
    user_id
});

export const getToken = user =>
    jwt.sign({ id: user.id, email: user.email }, config.auth.secret, {
        expiresIn: '12h'
    });

export const createFine = user_id => Fine.query().insert(getFine(user_id));
export const findUser = email => User.query().where('email', email);
