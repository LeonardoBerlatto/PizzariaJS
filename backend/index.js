const express = require('express');

const app = express();

require('./startup/db')();

module.exports = app;