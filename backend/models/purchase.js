const Sequelize = require('sequelize');
const sequelize = require('../db/sequelize');

const Purchase = sequelize.define('purchase', {
	totalPrice: {
		type: Sequelize.FLOAT,
		allowNull: false,
		field: 'total_price'
	}
});

module.exports = Purchase;