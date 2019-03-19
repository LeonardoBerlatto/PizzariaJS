const Sequelize = require('sequelize');
const Joi = require('joi');
const sequelize = require('../db/sequelize');
const { Ingredient } = require('./ingredient');

const Flavor = sequelize.define('flavor', {
	name: {
		type: Sequelize.TEXT,
		allowNull: false,
	},
	defaultPrice: {
		type: Sequelize.DOUBLE,
		allowNull: false,
		field: 'default_price'
	},
	type: {
		type: Sequelize.ENUM('savory', 'sweet'),
		allowNull: false
	},
});

Flavor.belongsToMany(Ingredient, {
	through: 'flavor_ingredient',
});
Ingredient.belongsToMany(Flavor, {
	through: 'flavor_ingredient',
});

let validateFlavor = (flavor) => {
	const schema = {
		name: Joi.string().min(5).max(125).required(),
		defaultPrice: Joi.number().min(1.90).max(50.00).precision(2).required(),
		type: Joi.string().min(5).max(6).required(),
		franchiseId: Joi.number().positive().required()
	};
	return Joi.validate(flavor, schema);
};

module.exports.Flavor = Flavor;
module.exports.validateFlavor = validateFlavor;