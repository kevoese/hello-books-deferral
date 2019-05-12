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
    password: 'secret0001'
});

export const createUser = user =>
    User.query().insert({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        password: 'secret0001'
    });

export const approvedBook = (patronId, theBookId) => ({
    user: patronId,
    book: theBookId,
    status: 'approved',
    requestDate: new Date(),
    approvedDate: new Date(),
    returned: false,
    returnDate: new Date(new Date().setDate(new Date().getDate() + 30))
});
