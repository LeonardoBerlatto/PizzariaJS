const Sequelize = require('sequelize');
const sequelize = require('../db/sequelize');

const User = sequelize.define('project', {
	id: {
		type: Sequelize.INTEGER,
		allowNull: false,
		autoIncrement: true,
		primaryKey: true
	},
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