import { validateAll } from "indicative";

const addBook = (req, res, next) => {
  const rules = {
    title: "required|string",
    coverType: "required|string",
    description: "required|string",
    isbn: "required|string",
    publisher: "required|string",
    year: "required|number"
  };

  const data = req.body;

  const messages = {
    required: "{{ field }} is required to create a book"
  };

  validateAll(data, rules, messages)
    .then(() => {
      next();
    })
    .catch(errors => {
      // [{ field: 'title', message: 'title is required to create a book' }, { field: 'isbn', message: 'isbn is required to create a book' }]
      //
      res.status(422).jerror("ValidationFailed", errors);
    });
};

const getBookValidation = (req, res, next) => {
  const rules = {
    id: "required|number"
  };

  const data = req.params;
  const messages = {
    required: "{{ field }} is required to get a book",
    number: "{{ field }} is expected to be a an integer"
  };

  validateAll(data, rules, messages)
    .then(() => {
      next();
    })
    .catch(errors => {
      res.status(422).jerror("ValidationFailed", errors);
    });
};

export default { addBook, getBookValidation };
