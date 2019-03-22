const Sequelize = require('sequelize');
const Joi = require('joi');
const sequelize = require('../db/sequelize');
const {
	Product
} = require('./product');
const {
	Flavor
} = require('./flavor');
const {
	Purchase
} = require('./purchase');

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

Franchise.hasMany(Flavor, {
	foreignKey: 'franchiseId',
	sourceKey: 'id'
});
Flavor.belongsTo(Franchise, {
	foreignKey: 'franchiseId',
	targetKey: 'id'
});


Franchise.hasMany(Purchase, {
	foreignKey: 'franchiseId',
	sourceKey: 'id'
});
Purchase.belongsTo(Franchise, {
	foreignKey: 'franchiseId',
	targetKey: 'id'
});

Franchise.hasMany(Product, {
	foreignKey: 'franchiseId',
	sourceKey: 'id'
});

Product.belongsTo(Franchise, {
	foreignKey: 'franchiseId',
	targetKey: 'id'
});

let validateFranchise = (franchise) => {
	const schema = {
		name: Joi.string().min(5).max(80).required(),
		shopsNumber: Joi.number().positive().required(),
		userId: Joi.number().positive().required()
	};
	return Joi.validate(franchise, schema);
};

module.exports.Franchise = Franchise;
module.exports.validateFranchise = validateFranchise;