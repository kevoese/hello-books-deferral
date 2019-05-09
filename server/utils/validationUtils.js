import { validations } from "indicative";
import { Vanilla } from "indicative/builds/formatters";
import Validator from "indicative/builds/validator";
import User from "@models/User";

/* custom user friendly error messages */
export const messages = {
  required: "{{ field }} is required to create a new account",
  string: "{{ field }} is not a string",
  unique: "{{ field }} must be unique",
  email: "{{ field }} is invalid",
  min: "{{ field }} is must be less than {{ argument.0 }}",
  alpha_numeric: "only numbers and letters are allowed for {{ field }}",
  confirmed: "Confirm {{ field }} does not match {{ field }}"
};

/* sanitization rule to trim whitespaces */
export const sanitizeRules = {
  firstName: "trim",
  lastName: "trim",
  email: "trim",
  password: "trim"
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

export const validatorInstance = Validator(
  validations,
  Vanilla
); /* create custom validator */
