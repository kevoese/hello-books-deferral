const express = require('express');
const AuthorController = require('../controllers/AuthorController');

const authorRoute = express.Router();
authorRoute.post('/authors', AuthorController.create);

module.exports = authorRoute;
