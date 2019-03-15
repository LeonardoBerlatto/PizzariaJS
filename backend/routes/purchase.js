const router = require('express').Router();
const PurchaseService = require('../services/purchaseService');
const { CREATED } = require('../utils/statusCodes');

router.get('/:id', async (req, res) => {
	try {
		const purchase = await PurchaseService.getPurchaseById(req.params.id);
		res.send(purchase);
	} catch (error) {
		res.status(error.status);
		res.send(error.message);
	}
});

router.get('/user/:id', async (req, res) => {
	try {
		const purchases = await PurchaseService.getAllPurchasesFromUser(req.params.id);
		res.send(purchases);
	} catch (error) {
		res.status(error.status);
		res.send(error.message);
	}
});

router.get('/franchise/:id', async (req, res) => {
	try {
		const purchases = await PurchaseService.getAllPurchasesFromUser(req.params.id);
		res.send(purchases);
	} catch (error) {
		res.status(error.status);
		res.send(error.message);
	}
});

router.post('/', async (req, res) => {
	try {
		const purchase = await PurchaseService.createPurchase(req.body);
		res.status(CREATED);
		res.send(purchase);
	} catch (error) {		
		res.status(error.status);
		res.send(error.message);
	}
});

module.exports = router;