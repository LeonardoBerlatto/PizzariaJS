const {
	BAD_REQUEST
} = require('../utils/statusCodes');

class FlavorNameAlreadyInUseError extends Error {
	constructor(msg) {
		super(`Your franchise already has the name ${msg} as a flavor`);
		this.status = BAD_REQUEST;
	}
}

module.exports = FlavorNameAlreadyInUseError;