const Sequelize = require('sequelize');
const sequelize = require('../db/sequelize');

const Franchise = sequelize.define('franchise', {
	name: {
		type: Sequelize.TEXT,
		allowNull: false
	},
	shopsNumber: {
		type: Sequelize.INTEGER,
		allowNull: false
	},
});

module.exports = Franchise;