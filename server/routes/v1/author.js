const express = require("express");
const AuthorController = require("../../middlewares/controllers/authorController");
const AuthorValidator = require("../../middlewares/validators/authorValidator");

const router = express.Router();

router.post("/authors", AuthorValidator.addAuthor, AuthorController.addAuthor);

module.exports = router;
