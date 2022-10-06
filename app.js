require('dotenv').config();
const cors = require('cors');
const express = require('express');
const bodyParser = require('body-parser');
const router = require('./src/router');

const port = process.env.PORT || 3000;

const app = express();

// on ajoute le middleware pour cors dans son mode le plus ouvert, il accepte tout
app.use(cors('*'));

app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());

app.use(router);

app.listen(port, () => {
  console.log(`Server listening on port=${port}`);
});

module.exports = app;
