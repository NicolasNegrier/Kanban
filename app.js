require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const router = require('./src/router');

const port = process.env.PORT || 5000;

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());

app.use(router);

app.listen(port, () => {
  console.log(`Server listening on port=${port}`);
});
