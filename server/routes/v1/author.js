const express = require("express");
const AuthorController = require("../../middlewares/controllers/authorController");
const AuthorValidator = require("../../middlewares/validators/authorValidator");

const router = express.Router();

router.post("/", AuthorValidator.addAuthor, AuthorController.addAuthor);
router.get(
  "/:id",
  AuthorValidator.deleteOrGetAuthor,
  AuthorController.getSingleAuthor
);
router.patch(
  "/:id",
  AuthorValidator.updateAuthor,
  AuthorController.updateAuthor
);
router.delete(
  "/:id",
  AuthorValidator.deleteOrGetAuthor,
  AuthorController.deleteAuthor
);

module.exports = router;
