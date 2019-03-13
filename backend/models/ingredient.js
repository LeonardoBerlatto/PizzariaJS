const Sequelize = require('sequelize');
const sequelize = require('../db/sequelize');

const Ingridient = sequelize.define('ingridient', {
	name: {
		type: Sequelize.TEXT,
		allowNull: false,
	}
});

module.exports = Ingridient;