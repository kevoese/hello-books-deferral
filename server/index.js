const express = require('express');
const dotenv = require('dotenv');

dotenv.config();
const app = express();

app.get('/', (req, res) => {
  res.send({ message: 'Hello Books Deferral' });
});

const { PORT } = process.env;
app.listen(PORT);
