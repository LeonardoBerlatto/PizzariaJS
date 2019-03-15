const Franchise = require('../models/franchise');
const NotFoundError = require('../exceptions/NotFoundError');
const InvalidInput = require('../exceptions/InvalidInput');
const FranchiseNameAlreadyExistsError = require('../exceptions/FranchiseNameAlreadyExistsError');
const User = require('../models/user');

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

	try {
		const franchise = await Franchise.create(data);
		return franchise;
	} catch (error) {
		throw new InvalidInput(error.message);
	}
}

async function updateFranchise(id, dataToUpdate) {
	const franchise = await Franchise.findByPk(id);
	if (!franchise) {
		throw new NotFoundError('Franchise');
	}

	try {
		await Franchise.update(
			dataToUpdate, {
				where: {
					id
				}
			});
		const updatedFranchise = await Franchise.findByPk(id);
		return updatedFranchise;
	} catch (error) {
		throw new InvalidInput(error.message);
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
module.exports.createFranchise = createFranchise;
module.exports.updateFranchise = updateFranchise;
module.exports.deleteFranchise = deleteFranchise;