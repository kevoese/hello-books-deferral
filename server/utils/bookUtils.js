const { validations } = require("indicative");
const { Vanilla } = require("indicative/builds/formatters");
const Validator = require("indicative/builds/validator");
const Book = require("../models/Book");

/* custom user friendly error messages */
const messages = {
  required: "{{ field }} is required to create a book",
  string: "{{ field }} is not a string",
  number: "{{ field }} is not a number",
  different: "{{ field }} must be unique"
};

// Trim white spaces
const sanitizeRules = {
  title: "trim",
  coverType: "trim",
  description: "trim",
  isbn: "trim",
  publisher: "trim",
  year: "trim",
  copiesAvailable: "trim"
};

/* add the unique custom validator to indicative validations object */
validations.different = async (data, field, message, args, get) => {
  const value = get(data, field);
  if (!value) return;
  const column = args[1];
  const row = await Book.query().where(column, value);
  if (row[0]) throw message;
};

const validatorInstance = Validator(
  validations,
  Vanilla
); /* create custom validator */

module.exports = { validatorInstance, messages, sanitizeRules };
