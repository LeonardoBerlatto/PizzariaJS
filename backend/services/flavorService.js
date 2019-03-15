const Flavor = require('../models/flavor');
const Franchise = require('../models/franchise');
const NotFoundError = require('../exceptions/NotFoundError');
const InvalidInput = require('../exceptions/InvalidInput');
const FlavorNameAlreadyInUseError = require('../exceptions/FlavorNameAlreadyInUseError');

async function getFlavorById(id) {
	const flavor = await Flavor.findByPk(id, {
		include: [{
			model: Franchise,
			attributes: ['id', 'name']
		}]
	});

	if (!flavor) {
		throw new NotFoundError('Purchase');
	}

	return flavor;
}

async function getFlavorsFromFranchise(franchiseId) {
	const franchise = Franchise.findByPk(franchiseId);

	if (!franchise) {
		throw new NotFoundError('Franchise');
	}

	const flavors = await Flavor.findAll({
		where: {
			franchiseId
		}
	});

	return flavors;
}

async function createFlavor(data) {
	const franchise = await Franchise.findByPk(data.franchiseId);
	if (!franchise) {
		throw new NotFoundError('Franchise');
	}

	const flavor = await Flavor.findOne({
		where: {
			name: data.name,
			franchiseId: data.franchiseId
		}
	});

	if (flavor) {
		throw new FlavorNameAlreadyInUseError(data.name);
	}

	try {
		const flavor = await Flavor.create(data);
		return flavor;
	} catch (error) {
		throw new InvalidInput(error.message);
	}
}

async function updateFlavor(id, dataToUpdate) {
	const flavor = await Flavor.findByPk(id);
	if (!flavor) {
		throw new NotFoundError('Flavor');
	}

	try {
		await Flavor.update(
			dataToUpdate, {
				where: {
					id
				}
			});
		const updatedFlavor = await Flavor.findByPk(id);
		return updatedFlavor;
	} catch (error) {
		throw new InvalidInput(error.message);
	}
}

async function deleteFlavor(id) {
	const flavor = await Flavor.findByPk(id);
	if (!flavor) {
		throw new NotFoundError('Flavor');
	}

	await Flavor.destroy({
		where: {
			id
		}
	});

	return flavor;
}

module.exports.getFlavorById = getFlavorById;
module.exports.getFlavorsFromFranchise = getFlavorsFromFranchise;
module.exports.createFlavor = createFlavor;
module.exports.updateFlavor = updateFlavor;
module.exports.deleteFlavor = deleteFlavor;