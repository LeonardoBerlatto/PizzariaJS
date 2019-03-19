const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = (req, res, next) => {
	let token = req.header('Authorization');
	if (!token) {
		return res.status(401).send('Access Denied');
	}
	try {
		token = token.replace('Bearer ', '');

		const decoded = jwt.verify(token, config.get('jwtPrivateKey'));
		req.user = decoded;
		next();
	} catch (ex) {
		res.status(400).send('Invalid token');
	}
};