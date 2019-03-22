const InvalidInputError = require('../exceptions/InvalidInputError');
const ProdutctAlreadyExistsError = require('../exceptions/ProdutctAlreadyExistsError');

const {
	Product,
	validateProduct
} = require('../models/product');
const {
	Franchise
} = require('../models/franchise');
const NotFoundError = require('../exceptions/NotFoundError');


async function getProductById(id) {
	const product = await Product.findByPk(id);

	if (!product) {
		throw new NotFoundError('Product');
	}

	return product;
}

async function getAllProductsFromFranchise(franchiseId) {
	const franchise = Franchise.findByPk(franchiseId);

	if (!franchise) {
		throw new NotFoundError('Franchise');
	}


	const products = await Product.findAll({
		where: {
			franchiseId
		}
	});

	return products;
}

async function createProduct(data) {
	const franchise = Franchise.findByPk(data.franchiseId);

	if (!franchise) {
		throw new NotFoundError('Franchise');
	}

	const product = await Product.findOne({
		where: {
			name: data.name
		}
	});

	if (product) {
		throw new ProdutctAlreadyExistsError();
	}

	const {
		error
	} = validateProduct(data);
	if (error)
		throw new InvalidInputError(error.details[0].message);

	try {
		const product = await Product.create(data);
		return product;
	} catch (error) {
		throw new InvalidInputError(error.message);
	}
}

async function updateProduct(id, dataToUpdate) {
	const product = await Product.findByPk(id);
	if (!product) {
		throw new NotFoundError('Product');
	}

	try {
		await Product.update(
			dataToUpdate, {
				where: {
					id
				}
			});
		const updatedProduct = await Product.findByPk(id);
		return updatedProduct;
	} catch (error) {
		throw new InvalidInputError(error.message);
	}
}

async function deleteProduct(id) {
	const product = await Product.findByPk(id);
	if (!product) {
		throw new NotFoundError('Product');
	}

	await Product.destroy({
		where: {
			id
		}
	});

	return product;
}

module.exports.getProductById = getProductById;
module.exports.getAllProductsFromFranchise = getAllProductsFromFranchise;
module.exports.createProduct = createProduct;
module.exports.updateProduct = updateProduct;
module.exports.deleteProduct = deleteProduct;