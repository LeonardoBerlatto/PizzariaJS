const {
	NOT_FOUND
} = require('../utils/statusCodes');

class NotFoundError extends Error {
	constructor(element) {
		super(`${element} not found`);
		this.status = NOT_FOUND;
	}
}

module.exports = NotFoundError;