const Sequelize = require('sequelize');
const sequelize = require('../db/sequelize');
const Flavor = require('./flavor');
const Purchase = require('./purchase');

const Franchise = sequelize.define('franchise', {
	name: {
		type: Sequelize.TEXT,
		allowNull: false
	},
	shopsNumber: {
		type: Sequelize.INTEGER,
		allowNull: false,
		field: 'shops_number'
	},
});

Franchise.hasMany(Flavor, {foreignKey: 'franschiseId', sourceKey: 'id'});
Flavor.belongsTo(Franchise, {foreignKey: 'franschiseId', targetKey: 'id'});


Franchise.hasMany(Purchase, {foreignKey: 'franschiseId', sourceKey: 'id'});
Purchase.belongsTo(Franchise, {foreignKey: 'franschiseId', targetKey: 'id'});

module.exports = Franchise;