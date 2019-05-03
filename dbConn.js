require('dotenv').config();
const Knex = require('knex');
const config = require('./knexfile');

/* Initialize knex. */
const environment = process.env.NODE_ENV;
const knex = Knex(config[environment]);

module.exports = knex;