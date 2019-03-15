const router = require('express').Router();
const UserService = require('../services/userService');
const { CREATED, OK } = require('../utils/statusCodes');

router.get('/:id', async (req, res) => {
	try {
		const user = await UserService.getUserById(req.params.id);
		res.send(user);
	} catch (error) {
		res.status(error.status);
		res.send(error.message);
	}
});


router.post('/', async (req, res) => {
	try {
		const user = await UserService.createUser(req.body);
		res.send(user);
		res.sendStatus(CREATED);
	} catch (error) {	
		res.status(error.status);
		res.send(error.message);
	}
});

router.patch('/:id', async (req, res) => {
	try {
		const user = await UserService.updateUser(req.params.id, req.body);
		res.status(OK);
		res.send(user);
	} catch (error) {	
		res.status(error.status);
		res.send(error.message);
	}
});

router.delete('/:id', async (req, res) => {
	try {
		const user = await UserService.deleteUser(req.params.id);
		res.send(user);
	} catch (error) {
		res.status(error.status);
		res.send(error.message);
	}
});

module.exports = router;