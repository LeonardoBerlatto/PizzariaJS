const {
	BAD_REQUEST
} = require('../utils/statusCodes');

class EmailAlreadyInUseError extends Error {
	constructor() {
		super('Email is already in use');
		this.status = BAD_REQUEST;
	}
}

module.exports = EmailAlreadyInUseError;