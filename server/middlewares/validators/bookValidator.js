const { sanitize } = require("indicative");
const {
  validatorInstance,
  messages,
  sanitizeRules
} = require("./../../utils/bookUtils");

const addBook = (req, res, next) => {
  const rules = {
    title: "required|string",
    coverType: "required|string",
    description: "required|string",
    isbn: "required|string|different:books,isbn",
    publisher: "required|string",
    year: "required|number",
    copiesAvailable: "required|number"
  };

  // Sanitize data objects
  let data = req.body;
  data = sanitize(data, sanitizeRules);

  // Validate all fields using custom validator
  validatorInstance
    .validateAll(data, rules, messages)
    .then(() => {
      next();
    })
    .catch(errors => {
      res.status(422).jerror("ValidationFailed", errors);
    });
};

module.exports = addBook;
