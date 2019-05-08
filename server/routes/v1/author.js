const express = require("express");
const AuthorController = require("../../middlewares/controllers/authorController");
const AuthorValidator = require("../../middlewares/validators/authorValidator");

const router = express.Router();

router.post("/", AuthorValidator.addAuthor, AuthorController.addAuthor);
router.get("/", AuthorController.getAuthor);
router.patch(
  "/:id",
  AuthorValidator.updateAuthor,
  AuthorController.updateAuthor
);
router.delete(
  "/:id",
  AuthorValidator.deleteAuthor,
  AuthorController.deleteAuthor
);

module.exports = router;
