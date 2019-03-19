const {
	UNAUTHORIZED
} = require('../utils/statusCodes');

class NotFoundError extends Error {
	constructor() {
		super('Invalid email or password.');
		this.status = UNAUTHORIZED;
	}
}

module.exports = NotFoundError;