require('mysql2/node_modules/iconv-lite').encodingExists('foo');
const {
	validateUser
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