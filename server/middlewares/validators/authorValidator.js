const { validateAll } = require("indicative");

const addAuthor = (req, res, next) => {
  const rules = {
    name: "required|string"
  };
  const data = req.body;
  const messages = {
    required: "{{ field }} is required to create an author"
  };

  validateAll(data, rules, messages)
    .then(() => {
      next();
    })
    .catch(errors => {
      res.status(400).jerror(errors);
    });
};

module.exports = { addAuthor };
