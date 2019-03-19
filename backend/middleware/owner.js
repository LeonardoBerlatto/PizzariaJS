module.exports = function (req, res, next) {
	if (!req.user.userType === 'owner')
		return res.status(403).send('Access Denied');
	next();
};