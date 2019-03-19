const router = require('express').Router();
const {
	login
} = require('../services/authService');
const { generateAuthToken } = require('../models/user');

router.post('/', async (req, res) => {
	try {
		const user = await login(req.body);
		const token = generateAuthToken(user);
		res.send({
			token: token
		});
	} catch (error) {
		res.status(error.httpStatus);
		res.send(error.message);
	}
});


module.exports = router;