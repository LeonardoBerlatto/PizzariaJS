const {
	BAD_REQUEST
} = require('../utils/statusCodes');

class EmailAlreadyInUseError extends Error {
	constructor(msg) {
		super(`Invalid Input\n${msg}`);
		this.status = BAD_REQUEST;
	}
}

module.exports = EmailAlreadyInUseError;