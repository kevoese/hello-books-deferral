const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const consola = require('consola');
const bodyParser = require('body-parser');
const swagger = require('swagger-ui-express');
const Knex = require('knex');
const { Model } = require('objection');
const KnexFile = require('../knexfile');
const swaggerDocument = require('../swagger');
const auth = require('./routes/v1/auth');

dotenv.config();
const app = express();

const dbConn = Knex(KnexFile[process.env.NODE_ENV]);
Model.knex(dbConn);

app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/api/v1/auth', auth);

app.get('/', (req, res) => {
  res.send({ message: 'Hello Books Deferral' });
});

/**
 *  setup Swagger
 */
app.use('/api-docs', swagger.serve, swagger.setup(swaggerDocument, { explorer: true }));

const { PORT } = process.env;
const server = app.listen(PORT, () => {
  consola.success(`server start at port ${PORT}`);
});

module.exports = { server, dbConn };
