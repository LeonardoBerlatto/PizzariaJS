const User = require('../models/user');
const NotFoundError = require('../exceptions/NotFoundError');


async function getUserById(id) {
	const user = await User.findById(id);
	if (!user) {
		throw new NotFoundError();
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
		throw new NotFoundError();
	}
	await User.create(data);

	return data;
}

module.exports.getUserById = getUserById;
module.exports.createUser = createUser;