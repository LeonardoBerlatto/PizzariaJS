const express = require('express');
const UserRouter = require('./routes/user');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/users', UserRouter);

module.exports = app;