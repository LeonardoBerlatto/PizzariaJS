const Sequelize = require('sequelize');
const Joi = require('joi');
const sequelize = require('../db/sequelize');

const Ingredient = sequelize.define('ingredient', {
	name: {
		type: Sequelize.TEXT,
		allowNull: false,
	}
});

let validateIngredient = (ingredient) => {
	const schema = {
		name: Joi.string().min(4).max(50),
		flavorId: Joi.number().positive().required()
	};
	return Joi.validate(ingredient, schema);
};

module.exports.Ingredient = Ingredient;
module.exports.validateIngredient = validateIngredient;