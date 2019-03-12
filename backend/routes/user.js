const router = require('express').Router();
const UserService = require('../services/userService');

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
	} catch (error) {
		res.status(error.status);
		res.send(error.message);
	}
});

module.exports = router;