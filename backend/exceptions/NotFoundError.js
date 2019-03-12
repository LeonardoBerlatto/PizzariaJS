const {
	NOT_FOUND
} = require('../utils/statusCodes');

class NotFoundError extends Error {
	constructor() {
		super('Not found');
		this.status = NOT_FOUND;
	}
}

module.exports = NotFoundError;