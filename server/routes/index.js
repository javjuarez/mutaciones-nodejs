const express = require('express');
const app = express();

app.use(require('./mutaciones'));

module.exports = app;