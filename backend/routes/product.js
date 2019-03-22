const router = require('express').Router();
const ProductService = require('../services/productService');
const {
	CREATED,
	OK
} = require('../utils/statusCodes');
const auth = require('../middleware/auth');
const owner = require('../middleware/owner');

router.get('/:id', [auth], async (req, res) => {
	try {
		const product = await ProductService.getProductById(req.params.id);
		res.send(product);
	} catch (error) {
		res.status(error.status);
		res.send(error.message);
	}
});

router.get('/franchise/:id', [auth], async (req, res) => {
	try {
		const products = await ProductService.getAllProductsFromFranchise(req.params.id);
		res.send(products);
	} catch (error) {
		res.status(error.status);
		res.send(error.message);
	}
});

router.post('/', [auth, owner], async (req, res) => {
	try {
		const product = await ProductService.createProduct(req.body);
		res.status(CREATED);
		res.send(product);
	} catch (error) {		
		res.status(error.status);
		res.send(error.message);
	}
});

router.patch('/:id', [auth, owner], async (req, res) => {
	try {
		const product = await ProductService.updateProduct(req.params.id, req.body);
		res.status(OK);
		res.send(product);
	} catch (error) {
		res.status(error.status);
		res.send(error.message);
	}
});

router.delete('/:id', [auth, owner], async (req, res) => {
	try {
		const product = await ProductService.deleteProduct(req.params.id);
		res.send(product);
	} catch (error) {
		res.status(error.status);
		res.send(error.message);
	}
});

module.exports = router;