const express = require("express");

const addBookValidation = require("../../middlewares/validators/bookValidator");

const router = express.Router();
const { storeBooks } = require("../../middlewares/controllers/bookController");

router.post("/", addBookValidation, storeBooks);

module.exports = router;
