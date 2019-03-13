const Sequelize = require('sequelize');
const sequelize = require('../db/sequelize');
const Franchise = require('./franchise');
const Purchase = require('./purchase');

const User = sequelize.define('user', {
	name: {
		type: Sequelize.TEXT,
		allowNull: false,
	},
	email: {
		type: Sequelize.TEXT,
		allowNull: false,
		validate: {
			isEmail: true
		}
	},
	userType: {
		type: Sequelize.ENUM('admin', 'owner', 'simple'),
		allowNull: false,
		field: 'user_type'
	},
	password: {
		type: Sequelize.STRING,
		allowNull: false,
	}
});

User.hasMany(Purchase, {foreignKey: 'userId', sourceKey: 'id'});
Purchase.belongsTo(User, {foreignKey: 'userId', targetKey: 'id'});

User.hasMany(Franchise, {foreignKey: 'userId', sourceKey: 'id'});
Franchise.belongsTo(User, {foreignKey: 'userId', targetKey: 'id'});

module.exports = User;