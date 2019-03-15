const Purchase = require('../models/purchase');
const User = require('../models/user');
const Franchise = require('../models/franchise');
const NotFoundError = require('../exceptions/NotFoundError');
const InvalidInput = require('../exceptions/InvalidInput');

async function getPurchaseById(id) {
	const purchase = await Purchase.findByPk(id, {
		include: [{
			model: User,
			attributes: ['id', 'name'],

		}, {
			model: Franchise,
			attributes: ['id', 'name']
		}],
	});

	if (!purchase) {
		throw new NotFoundError('Purchase');
	}
	return purchase;
}

async function getAllPurchasesFromUser(userId) {
	const user = User.findByPk(userId);

	if (!user) {
		throw new NotFoundError('User');
	}

	const purchases = await Purchase.findAll({
		where: {
			userId
		},
		include: [{
			model: Franchise,
			attributes: ['id', 'name']
		}]
	});

	return purchases;
}

async function getAllPurchasesFromFranchise(franchiseId) {
	const franchise = Franchise.findByPk(franchiseId);

	if (!franchise) {
		throw new NotFoundError('Franchise');
	}

	const purchases = await Purchase.findAll({
		where: {
			franchiseId,
		},
		include: [{
			model: User,
			attributes: ['id', 'name'],

		}]
	});

	return purchases;
}

async function createPurchase(data) {
	const user = User.findByPk(data.userId);
	if (!user) {
		throw new NotFoundError('Error');
	}

	const franchise = await Franchise.findByPk(data.franchiseId);
	if (!franchise) {
		throw new NotFoundError('Franchise');
	}

	try {
		const purchase = await Purchase.create(data);
		return purchase;
	} catch (error) {
		throw new InvalidInput(error.message);
	}
}

module.exports.getPurchaseById = getPurchaseById;
module.exports.getAllPurchasesFromUser = getAllPurchasesFromUser;
module.exports.getAllPurchasesFromFranchise = getAllPurchasesFromFranchise;
module.exports.createPurchase = createPurchase;