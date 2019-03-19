const {
	Ingredient,
	validateIngredient
} = require('../models/ingredient');
const NotFoundError = require('../exceptions/NotFoundError');
const {
	Flavor
} = require('../models/flavor');
const IngredientBelongstoFlavorError = require('../exceptions/IngredientBelongstoFlavorError');
const InvalidInputError = require('../exceptions/InvalidInputError');

async function getIngredientById(id) {
	const ingredient = await Ingredient.findByPk(id);

	if (!ingredient) {
		throw new NotFoundError('Ingredient');
	}

	return ingredient;
}

async function createIngredient(data) {
	const flavor = await Flavor.findByPk(data.flavorId);
	if (!flavor) {
		throw new NotFoundError('Flavor');
	}

	const ingredient = await Ingredient.findOne({
		where: {
			name: data.name
		}
	});

	if (ingredient) {
		throw new IngredientBelongstoFlavorError(data.name);
	}

	const {
		error
	} = validateIngredient(data);
	if (error)
		throw new InvalidInputError(error.details[0].message);

	try {
		const ingredient = await Ingredient.create(data);
		flavor.addIngredients([ingredient]);
		return ingredient;
	} catch (error) {
		throw new InvalidInputError(error.message);
	}
}

async function updateIngredient(id, dataToUpdate) {
	const ingredient = await Ingredient.findByPk(id);
	if (!ingredient) {
		throw new NotFoundError('Ingredient');
	}

	try {
		await Ingredient.update(
			dataToUpdate, {
				where: {
					id
				}
			});
		const updatedIngredient = await Ingredient.findByPk(id);
		return updatedIngredient;
	} catch (error) {
		throw new InvalidInputError(error.message);
	}
}

async function deleteIngredient(id) {
	const ingredient = await Ingredient.findByPk(id);

	if (!ingredient) {
		throw new NotFoundError('Ingredient');
	}

	await Ingredient.destroy({
		where: {
			id
		}
	});

	return ingredient;
}

module.exports.getIngredientById = getIngredientById;
module.exports.createIngredient = createIngredient;
module.exports.updateIngredient = updateIngredient;
module.exports.deleteIngredient = deleteIngredient;