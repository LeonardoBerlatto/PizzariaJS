const router = require('express').Router();
const UserService = require('../services/userService');
const {
	generateAuthToken
} = require('../models/user');
const {
	CREATED,
	OK
} = require('../utils/statusCodes');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');


router.get('/:id', async (req, res) => {
	try {
		const user = await UserService.getUserById(req.params.id);
		res.send(user);
	} catch (error) {
		res.status(error.status);
		res.send(error.message);
	}
});


router.post('/', [auth, admin], async (req, res) => {
	try {
		const user = await UserService.createUser(req.body);
		const token = generateAuthToken(user);
		res.header('Authorization', token);
		res.status(CREATED);
		res.send(user);
	} catch (error) {
		res.status(error.status);
		res.send(error.message);
	}
});

router.patch('/:id', [auth, admin], async (req, res) => {
	try {
		const user = await UserService.updateUser(req.params.id, req.body);
		res.status(OK);
		res.send(user);
	} catch (error) {
		res.status(error.status);
		res.send(error.message);
	}
});

router.delete('/:id', [auth, admin], async (req, res) => {
	try {
		const user = await UserService.deleteUser(req.params.id);
		res.send(user);
	} catch (error) {
		res.status(error.status);
		res.send(error.message);
	}
});

module.exports = router;