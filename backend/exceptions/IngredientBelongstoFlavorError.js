const {
	BAD_REQUEST
} = require('../utils/statusCodes');

class IngredientBelongstoFlavorError extends Error {
	constructor(msg) {
		super(`This flavor already has the ingredient '${msg}'`);
		this.status = BAD_REQUEST;
	}
}

module.exports = IngredientBelongstoFlavorError;