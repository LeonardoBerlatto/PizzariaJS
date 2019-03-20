const Joi = require('joi');
const bcrypt = require('bcrypt');
const {
	User
} = require('../models/user');
const UnauthorizedError = require('../exceptions/UnauthorizedError');
const InvalidInputError = require('../exceptions/InvalidInputError');


module.exports.login = async (userToLogin) => {
	const {
		error
	} = validateUser(userToLogin);
	if (error)
		throw new InvalidInputError(error.details[0].message);

	let user = await User.findOne({
		where: {
			email: userToLogin.email
		}
	});
	if (!user)
		throw new UnauthorizedError();

	const validPassword = await bcrypt.compare(userToLogin.password, user.password);
	if (!validPassword)
		throw new UnauthorizedError();

	return user;
};

function validateUser(req) {
	const schema = {
		email: Joi.string().min(6).max(50).email().required(),
		password: Joi.string().min(8).max(32).required()
	};
	return Joi.validate(req, schema);
}