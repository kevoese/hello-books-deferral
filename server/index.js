const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const consola = require("consola");
const bodyParser = require("body-parser");
const swagger = require("swagger-ui-express");
const Knex = require("knex");
const { Model } = require("objection");
const KnexFile = require("../knexfile");
const swaggerDocument = require("../swagger");
const auth = require("./routes/v1/auth");
const author = require("./routes/v1/author");

require("express-jsend");

dotenv.config();
const app = express();

const databaseConnection = Knex(KnexFile[process.env.NODE_ENV]);
Model.knex(databaseConnection);

app.use(morgan("combined"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/api/v1/auth", auth);
app.use("/api/v1", author);

app.get("/", (req, res) => {
  res.status(200).jsend({ message: "Hello Books Deferral" });
});
/**
 *  setup Swagger
 */
app.use(
  "/api-docs",
  swagger.serve,
  swagger.setup(swaggerDocument, { explorer: true })
);

const { PORT } = process.env;
const server = app.listen(PORT, () => {
  consola.success(`server start at port ${PORT}`);
});

module.exports = { server, databaseConnection };
