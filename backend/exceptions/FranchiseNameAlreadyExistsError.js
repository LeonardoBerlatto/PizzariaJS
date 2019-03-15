const {
	BAD_REQUEST
} = require('../utils/statusCodes');

class FranchiseNameAlreadyExistsError extends Error {
	constructor() {
		super('A franchise is already using this name');
		this.status = BAD_REQUEST;
	}
}

module.exports = FranchiseNameAlreadyExistsError;