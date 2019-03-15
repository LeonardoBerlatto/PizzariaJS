const express = require('express');
const UserRouter = require('./routes/user');
const FranchiseRouter = require('./routes/franchise');
const PurchaseRouter = require('./routes/purchase');
const FlavorRouter = require('./routes/flavor');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/users', UserRouter);
app.use('/api/franchises', FranchiseRouter);
app.use('/api/purchases', PurchaseRouter);
app.use('/api/flavors', FlavorRouter);

module.exports = app;