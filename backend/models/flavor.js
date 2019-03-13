const Sequelize = require('sequelize');
const sequelize = require('../db/sequelize');

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

module.exports = Flavor;