const router = require('express').Router();
const FranchiseService = require('../services/franchiseService');
const { CREATED, OK } = require('../utils/statusCodes');

router.get('/:id', async (req, res) => {
	try {
		const franchise = await FranchiseService.getFranchiseById(req.params.id);
		res.send(franchise);
	} catch (error) {
		res.status(error.status);
		res.send(error.message);
	}
});


router.post('/', async (req, res) => {
	try {
		const franchise = await FranchiseService.createFranchise(req.body);
		res.status(CREATED);
		res.send(franchise);
	} catch (error) {	
		res.status(error.status);
		res.send(error.message);
	}
});

router.patch('/:id', async (req, res) => {
	try {
		const franchise = await FranchiseService.updateFranchise(req.params.id, req.body);
		res.status(OK);
		res.send(franchise);
	} catch (error) {	
		res.status(error.status);
		res.send(error.message);
	}
});

router.delete('/:id', async (req, res) => {
	try {
		const franchise = await FranchiseService.deleteFranchise(req.params.id);
		res.send(franchise);
	} catch (error) {
		res.status(error.status);
		res.send(error.message);
	}
});

module.exports = router;