require('mysql2/node_modules/iconv-lite').encodingExists('foo');
const jwt = require('jsonwebtoken');
const config = require('config');

const {
	validateUser,
	generateAuthToken
} = require('../../../models/user');

describe('validateUser function', () => {
	it('should return a validated user object', () => {
		const data = {
			name: 'Leonardo',
			email: 'myemail@gmail.com',
			userType: 'admin',
			password: 'mypassword'
		};
		const res = validateUser(data);

		expect(res.error).toBeNull();
		expect(res.value).toMatchObject(data);
	});

	it('should return an error object when missing properties', () => {
		const data = {
			name: 'Leonardo',
		};
		const res = validateUser(data);
		expect(res.error.message).toMatch('child "email" fails because ["email" is required]');
	});
});

describe('generateAuthToken funtion', () => {
	it('should return a valid JWT', () => {
		const user = {
			id: 1,
			userType: 'owner'
		};
		const token = generateAuthToken(user);
		expect(token).toContain(['e'], '.');
	});

	it('should return a valid JWT ande decode it', () => {
		const user = {
			id: 1,
			userType: 'owner'
		};
		const token = generateAuthToken(user);
		const decoded = jwt.verify(token, config.get('jwtPrivateKey'));
		expect(decoded).toMatchObject(user);
	});
});