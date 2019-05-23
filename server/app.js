import config from '@config';
import express from 'express';
import consola from 'consola';
import path from 'path';
import cors from 'cors';
import bodyParser from 'body-parser';
import swagger from 'swagger-ui-express';
import Knex from 'knex';
import Webpack from 'webpack';
import { createServer } from 'http';
import { Model } from 'objection';
import swaggerDocument from '@/swagger.json';
import Routes from '@routes/v1';
import webpackConfig from '@/webpack.config';
import WebpackDevMiddleware from 'webpack-dev-middleware';
import WebpackHotMiddleware from 'webpack-hot-middleware';

import 'express-jsend';

export const app = express();

app.use(cors());

export const databaseConnection = Knex(config.database[config.server.env]);

if (config.server.env == 'development') {
    const compiler = Webpack(webpackConfig);

    app.use(
        WebpackDevMiddleware(compiler, {
            hot: true,
            publicPath: webpackConfig.output.publicPath
        })
    );

    app.use(WebpackHotMiddleware(compiler));
}

Model.knex(databaseConnection);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

Routes(app);

app.use(express.static(path.resolve(__dirname, 'public')));

app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'public/index.html'))
);

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
