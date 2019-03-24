const {
	Franchise,
	validateFranchise
} = require('../models/franchise');
const NotFoundError = require('../exceptions/NotFoundError');
const InvalidInputError = require('../exceptions/InvalidInputError');
const FranchiseNameAlreadyExistsError = require('../exceptions/FranchiseNameAlreadyExistsError');
const {
	User
} = require('../models/user');

async function getFranchiseById(id) {
	const franchise = await Franchise.findByPk(id, {
		include: [{
			model: User,
			attributes: ['id', 'name']
		}]
	});
	if (!franchise) {
		throw new NotFoundError('Franchise');
	}
	return franchise;
}

async function getFranchisesFromUser(userId) {
	const franchises = await Franchise.findAll({
		include: [{
			all: true
		}],
		attributes: {
			exclude: ['createdAt', 'updatedAt', ]
		},
		where: {
			userId
		}
	});
	return franchises;
}

async function createFranchise(data) {
	const franchise = await Franchise.findOne({
		where: {
			name: data.name
		}
	});
	if (franchise) {
		throw new FranchiseNameAlreadyExistsError();
	}
	const user = User.findByPk(data.userId);
	if (!user) {
		throw new NotFoundError('User');
	}

	const {
		error
	} = validateFranchise(data);
	if (error) throw new InvalidInputError(error.details[0].message);

	try {
		const franchise = await Franchise.create(data);
		return franchise;
	} catch (error) {
		throw new InvalidInputError(error.message);
	}
}

async function updateFranchise(id, dataToUpdate) {
	const franchise = await Franchise.findByPk(id);
	if (!franchise) {
		throw new NotFoundError('Franchise');
	}

	try {
		await Franchise.update(dataToUpdate, {
			where: {
				id
			}
		});
		const updatedFranchise = await Franchise.findByPk(id);
		return updatedFranchise;
	} catch (error) {
		throw new InvalidInputError(error.message);
	}
}

async function deleteFranchise(id) {
	const franchise = await Franchise.findByPk(id);
	if (!franchise) {
		throw new NotFoundError('Franchise');
	}

	await Franchise.destroy({
		where: {
			id
		}
	});

	return franchise;
}

module.exports.getFranchiseById = getFranchiseById;
module.exports.getFranchisesFromUser = getFranchisesFromUser;
module.exports.createFranchise = createFranchise;
module.exports.updateFranchise = updateFranchise;
module.exports.deleteFranchise = deleteFranchise;