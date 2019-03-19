const {
	Flavor,
	validateFlavor
} = require('../models/flavor');
const {
	Franchise
} = require('../models/franchise');
const NotFoundError = require('../exceptions/NotFoundError');
const InvalidInputError = require('../exceptions/InvalidInputError');
const FlavorNameAlreadyInUseError = require('../exceptions/FlavorNameAlreadyInUseError');
const {
	Ingredient
} = require('../models/ingredient');

async function getFlavorById(id) {
	const flavor = await Flavor.findByPk(id, {
		include: [{
			model: Franchise,
			attributes: ['id', 'name']
		}, {
			model: Ingredient,
			through: {
				attributes: []
			}
		}],
	});

	if (!flavor) {
		throw new NotFoundError('Flavor');
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
		},
		include: [{
			model: Ingredient,
			attributes: ['id', 'name']
		}]
	});

	return flavors;
}

async function getIngredientsFromFlavor(flavorId) {
	const flavor = await Flavor.findByPk(flavorId);
	if (!flavor) {
		throw new NotFoundError('Flavor');
	}

	return flavor.getIngredients({
		joinTableAttributes: []
	});
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

	const {
		error
	} = validateFlavor(data);
	if (error)
		throw new InvalidInputError(error.details[0].message);

	try {
		const flavor = await Flavor.create(data);
		return flavor;
	} catch (error) {
		throw new InvalidInputError(error.message);
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
		throw new InvalidInputError(error.message);
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
module.exports.getIngredientsFromFlavor = getIngredientsFromFlavor;
module.exports.createFlavor = createFlavor;
module.exports.updateFlavor = updateFlavor;
module.exports.deleteFlavor = deleteFlavor;