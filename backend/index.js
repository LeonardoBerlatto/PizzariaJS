const express = require('express');
const UserRouter = require('./routes/user');
const FranchiseRouter = require('./routes/franchise');
const PurchaseRouter = require('./routes/purchase');
const FlavorRouter = require('./routes/flavor');
const ProductRouter = require('./routes/product');
const IngredientRouter = require('./routes/ingredient');
const AuthRouter = require('./routes/auth');

const cors = require('cors');
const morgan = require('morgan');
const app = express();
 
app.use(cors());
app.use(morgan(':method :url :status :res[content-length] - :response-time ms'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/users', UserRouter);
app.use('/api/franchises', FranchiseRouter);
app.use('/api/purchases', PurchaseRouter);
app.use('/api/flavors', FlavorRouter);
app.use('/api/products', ProductRouter);
app.use('/api/ingredients', IngredientRouter);
app.use('/api/auth', AuthRouter);



module.exports = app;