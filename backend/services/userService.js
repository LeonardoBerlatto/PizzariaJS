const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('config');
const {
	User,
	validateUser
} = require('../models/user');
const {
	Franchise
} = require('../models/franchise');
const NotFoundError = require('../exceptions/NotFoundError');
const EmailAlreadyInUseError = require('../exceptions/EmailAlreadyInUseError');
const InvalidInputError = require('../exceptions/InvalidInputError');

async function getUserById(id) {
	const user = await User.findByPk(id, {
		include: [{
			model: Franchise,
			attributes: ['id', 'name', 'shopsNumber']
		}],
		attributes: {
			exclude: ['createdAt','updatedAt', 'password']
		}
	});
	if (!user) {
		throw new NotFoundError('User');
	}
	return user;
}

async function verifyUserToken(token) {
	token = token.replace('Bearer ', '');
	const payload = jwt.verify(token, config.get('jwtPrivateKey'));
	
	return getUserById(payload.id);
}

async function createUser(data) {
	const user = await User.findOne({
		where: {
			email: data.email
		}
	});
	if (user) {
		throw new EmailAlreadyInUseError();
	}

	const {
		error
	} = validateUser(data);
	if (error)
		throw new InvalidInputError(error.details[0].message);

	const salt = await bcrypt.genSalt(10);
	data.password = await bcrypt.hash(data.password, salt);

	try {
		const user = await User.create(data);
		return user;
	} catch (error) {
		throw new InvalidInputError(error.message);
	}
}

async function updateUser(id, dataToUpdate) {
	const user = await User.findByPk(id);
	if (!user) {
		throw new NotFoundError('User');
	}

	try {
		await User.update(
			dataToUpdate, {
				returning: true,
				where: {
					id
				}
			});
		const updatedUser = await User.findByPk(id);
		return updatedUser;
	} catch (error) {
		throw new InvalidInputError(error.message);
	}
}

async function deleteUser(id) {
	const user = await User.findByPk(id);
	if (!user) {
		throw new NotFoundError('User');
	}

	await User.destroy({
		where: {
			id
		}
	});

	return user;
}

module.exports.getUserById = getUserById;
module.exports.verifyUserToken = verifyUserToken;
module.exports.createUser = createUser;
module.exports.deleteUser = deleteUser;
module.exports.updateUser = updateUser;