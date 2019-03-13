const Sequelize = require('sequelize');
const sequelize = require('../db/sequelize');
const Ingredient = require('./ingredient');

const Flavor = sequelize.define('flavor', {
	name: {
		type: Sequelize.TEXT,
		allowNull: false,
	},
	type: {
		type: Sequelize.ENUM('savory', 'sweet'),
		allowNull: false
	}
});

Flavor.belongsToMany(Ingredient, {
	through: 'flavor_ingredient',
});
Ingredient.belongsToMany(Flavor, {
	through: 'flavor_ingredient',
});

module.exports = Flavor;