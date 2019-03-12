const Sequelize = require('sequelize');
const sequelize = require('../db/sequelize');

const User = sequelize.define('user', {
	name: {
		type: Sequelize.TEXT,
		allowNull: false
	},
	email: {
		type: Sequelize.TEXT,
		allowNull: false
	},
	userType: {
		type: Sequelize.ENUM('admin', 'owner', 'simple'),
		allowNull: false
	}
});

module.exports = User;