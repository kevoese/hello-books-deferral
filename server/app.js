import express from 'express';
import consola from 'consola';
import bodyParser from 'body-parser';
import swagger from 'swagger-ui-express';
import Knex from 'knex';
import { createServer } from 'http';
import { Model } from 'objection';
import swaggerDocument from '@/swagger.json';
import Routes from '@routes/v1';
import config from '@config';
import path from 'path';

import 'express-jsend';

export const app = express();
app.use(express.static('views/assets'));

export const databaseConnection = Knex(config.database[config.server.env]);

Model.knex(databaseConnection);

const root = __dirname.substring(0, __dirname.lastIndexOf('/') + 1);

app.set('view engine', 'pug');
app.set('views', path.join(root, 'views'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

Routes(app);

app.get('/', (req, res) => {
    res.status(200).jsend({ message: 'Hello Books Deferral' });
});
/**
 *  setup Swagger
 */
app.use(
    '/api-docs',
    swagger.serve,
    swagger.setup(swaggerDocument, { explorer: true })
);

export const server = createServer(app);

export default { app, databaseConnection };
