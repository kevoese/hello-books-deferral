import faker from 'faker';
import User from '@models/User';
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
    password: 'secret0001'
});

export const createUser = user =>
    User.query().insert({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        password: 'secret0001',
        role: user.role || 'patron'
    });

export const superAdminUser = user =>
    User.query().insert({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        password: 'secret0001',
        role: 'super_admin'
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
