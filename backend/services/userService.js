const User = require('../models/user');
const NotFoundError = require('../exceptions/NotFoundError');
const EmailAlreadyInUseError = require('../exceptions/EmailAlreadyInUseError');
const InvalidInput = require('../exceptions/InvalidInput');

async function getUserById(id) {
	const user = await User.findByPk(id);
	if (!user) {
		throw new NotFoundError('User');
	}
	return user;
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

	try {
		const user = await User.create(data);
		return user;
	} catch (error) {
		throw new InvalidInput(error.message);
	}
}

async function updateUser(id, dataToUpdate) {
	const user = await User.findByPk(id);
	if (!user) {
		throw new NotFoundError();
	}

	try {
		await User.update({
			name: dataToUpdate.name,
			email: dataToUpdate.email,
			userType: dataToUpdate.userType,
			password: dataToUpdate.password
		}, {
			returning: true,
			where: {
				id
			}
		});
		const updatedUser = await User.findByPk(id);
		return updatedUser;
	} catch (error) {
		throw new InvalidInput(error.message);
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
module.exports.createUser = createUser;
module.exports.deleteUser = deleteUser;
module.exports.updateUser = updateUser;