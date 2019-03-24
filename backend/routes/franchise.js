const router = require('express').Router();
const FranchiseService = require('../services/franchiseService');
const {
	CREATED,
	OK
} = require('../utils/statusCodes');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');

router.get('/', [auth], async (req, res) => {
	try {
		const franchises = await FranchiseService.getAllFranchises();
		res.send(franchises);
	} catch (error) {
		res.status(error.status);
		res.send(error.message);
	}
});

router.get('/:id', [auth], async (req, res) => {
	try {
		const franchise = await FranchiseService.getFranchiseById(req.params.id);
		res.send(franchise);
	} catch (error) {
		res.status(error.status);
		res.send(error.message);
	}
});

router.get('/user/:id', [auth], async (req, res) => {
	try {
		const franchises = await FranchiseService.getFranchisesFromUser(req.params.id);
		res.send(franchises);
	} catch (error) {
		res.status(error.status);
		res.send(error.message);
	}
});

router.post('/', [auth, admin], async (req, res) => {
	try {
		const franchise = await FranchiseService.createFranchise(req.body);
		res.status(CREATED);
		res.send(franchise);
	} catch (error) {
		res.status(error.status);
		res.send(error.message);
	}
});

router.patch('/:id', [auth, admin], async (req, res) => {
	try {
		const franchise = await FranchiseService.updateFranchise(req.params.id, req.body);
		res.status(OK);
		res.send(franchise);
	} catch (error) {
		res.status(error.status);
		res.send(error.message);
	}
});

router.delete('/:id', [auth, admin], async (req, res) => {
	try {
		const franchise = await FranchiseService.deleteFranchise(req.params.id);
		res.send(franchise);
	} catch (error) {
		res.status(error.status);
		res.send(error.message);
	}
});

module.exports = router;