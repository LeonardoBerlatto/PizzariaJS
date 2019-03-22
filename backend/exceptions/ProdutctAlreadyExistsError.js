const {
	BAD_REQUEST
} = require('../utils/statusCodes');

class ProdutctAlreadyExistsError extends Error {
	constructor() {
		super('You already has this product for selling');
		this.status = BAD_REQUEST;
	}
}

module.exports = ProdutctAlreadyExistsError;