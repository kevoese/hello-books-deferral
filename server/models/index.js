/* eslint-disable import/order */
const { Model } = require('objection');

const connection = require('../../knexfile.js');

const Knex = require('knex')(connection.development);

Model.knex(Knex);


module.exports = Model;
