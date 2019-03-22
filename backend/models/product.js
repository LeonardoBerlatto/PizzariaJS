const Sequelize = require('sequelize');
const Joi = require('joi');
const sequelize = require('../db/sequelize');

const Product = sequelize.define('product', {
	name: {
		type: Sequelize.TEXT,
		allowNull: false,
	},
	defaultPrice: {
		type: Sequelize.DOUBLE,
		allowNull: false,
		field: 'default_price'
	},
	type: {
		type: Sequelize.ENUM('food', 'beverage'),
		allowNull: false
	},
});

let validateProduct = (product) => {
	const schema = {
		name: Joi.string().min(5).max(125).required(),
		defaultPrice: Joi.number().min(0.50).max(50.00).precision(2).required(),
		type: Joi.string().min(4).max(8).required(),
		franchiseId: Joi.number().positive().required()
	};
	return Joi.validate(product, schema);
};

module.exports.Product = Product;
module.exports.validateProduct = validateProduct;