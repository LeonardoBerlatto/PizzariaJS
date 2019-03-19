const Sequelize = require('sequelize');
const Joi = require('joi');
const sequelize = require('../db/sequelize');

const Purchase = sequelize.define('purchase', {
	totalPrice: {
		type: Sequelize.DOUBLE,
		allowNull: false,
		field: 'total_price'
	}
});

let validatePurchase = (purchase) => {
	const schema = {
		totalPrice: Joi.number().min(1.90).max(800.00).precision(2).required(),
		userId: Joi.number().positive().required(),
		franchiseId: Joi.number().positive().required()
	};
	return Joi.validate(purchase, schema);
};

module.exports.Purchase = Purchase;
module.exports.validatePurchase = validatePurchase;