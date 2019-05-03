const { validations, sanitize } = require('indicative');
const { Vanilla } = require('indicative/builds/formatters');
const Validator = require('indicative/builds/validator');
const User = require('../../models/User');

/* custom user friendly error messages */
const messages = {
  required: '{{ field }} is required to create a new account',
  string: '{{ field }} is not a string',
  unique: '{{ field }} must be unique',
  email: '{{ field }} is invalid',
  min: '{{ field }} is must be less than {{ argument.0 }}',
  alpha_numeric: 'only numbers and letters are allowed for {{ field }}',
  confirmed: 'Confirm {{ field }} does not match {{ field }}',
};

/* sanitization rule to trim whitespaces */
const sanitizeRules = {
  firstName: 'trim',
  lastName: 'trim',
  email: 'trim',
  password: 'trim'
};

/* add the unique custom validator to indicative validations object */
validations.unique = async (data, field, message, args, get) => {
  const value = get(data, field);
  if (!value) return;
  const column = args[1];
  /* check user table to see if there is an existing user email */
  const row = await User.query().where(column, value);
  if (row[0]) throw message;
};

const validatorInstance = Validator(validations, Vanilla);/* create custom validator */

/* validator object for all auth routes */
const validator = {
  signUp: (req, res, next) => {
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
    validatorInstance.validateAll(data, rules, messages)
      .then(() => {
        next();
      })
      .catch((errors) => {
        res.status(400).json(errors);
      });
  },
};

module.exports = validator;
