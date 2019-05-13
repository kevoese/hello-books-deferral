import { validations } from 'indicative';
import Book from '@models/Book';
import { Vanilla } from 'indicative/builds/formatters';
import Validator from 'indicative/builds/validator';
import User from '@models/User';
import Fine from '@models/Fine';

/* custom user friendly error messages */
export const messages = {
    required: '{{ field }} is required',
    string: '{{ field }} is not a string',
    unique: '{{ field }} must be unique',
    itExists: '{{ field }} not found',
    mustContain: '{{ field }} content not accepted',
    email: '{{ field }} is invalid',
    min: '{{ field }} must be more than {{ argument.0 }}',
    alpha_numeric: 'only numbers and letters are allowed for {{ field }}',
    confirmed: 'Confirm {{ field }} does not match {{ field }}',
    boolean: '{{ field }} is not set'
};

/* sanitization rule to trim whitespaces */
export const sanitizeRules = {
    firstName: 'trim',
    lastName: 'trim',
    email: 'trim',
    password: 'trim',
    title: 'trim',
    coverType: 'trim',
    description: 'trim',
    isbn: 'trim',
    publisher: 'trim',
    year: 'trim',
    copiesAvailable: 'trim',
    type: 'trim'
};

/* add the unique custom validator to indicative validations object */
validations.unique = async (data, field, message, args, get) => {
    const value = get(data, field);
    if (!value) return;
    const table = args[0];
    const column = args[1];
    /* check user table to see if there is an existing user email */
    let row;

    if (table === 'users') {
        row = await User.query().where(column, value);
    }

    if (table === 'books') {
        row = await Book.query().where(column, value);
    }

    if (row[0]) throw message;
};

/* add a custom validator to check for existing content in the validations object */
validations.itExists = async (data, field, message, args, get) => {
    const value = get(data, field);
    if (!value) return;
    const table = args[0];
    const column = args[1];

    /*check to see if a fine exist*/
    let found = true;

    if (table === 'fines') {
        [found] = await Fine.query().where(column, value);
    }

    if (table === 'users') {
        [found] = await User.query().where(column, value);
    }

    if (!found) throw message;
};

export const validatorInstance = Validator(
    validations,
    Vanilla
); /* create custom validator */
