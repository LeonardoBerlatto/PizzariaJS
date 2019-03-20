require('mysql2/node_modules/iconv-lite').encodingExists('foo');
const {
	generateAuthToken
} = require('../../../models/user');
const auth = require('../../../middleware/auth');

describe('auth middleware', () => {
	it('should populate req.user with the payload of a valid JWT', () => {
		const user = {
			id: 1,
			userType: 'admin'
		};
		const token = generateAuthToken(user);
		const req = {
			header: jest.fn().mockReturnValue(token)
		};
		const res = {};
		const next = jest.fn();

		auth(req, res, next);

		expect(req.user).toMatchObject(user);
	});
});