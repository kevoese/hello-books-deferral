const express = require("express");

const bookValidator = require("../../middlewares/validators/bookValidator");

const router = express.Router();
const bookController = require("../../middlewares/controllers/bookController");

router.post("/", bookValidator.addBook, bookController.storeBooks);
router.get("/", bookController.getAllBooks);
router.get(
  "/:id",
  bookValidator.getBookValidation,
  bookController.getSingleBook
);

module.exports = router;
