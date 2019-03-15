const express = require('express');
const UserRouter = require('./routes/user');
const FranchiseRouter = require('./routes/franchise');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/users', UserRouter);
app.use('/api/franchises', FranchiseRouter);

module.exports = app;