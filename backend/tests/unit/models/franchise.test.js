require('mysql2/node_modules/iconv-lite').encodingExists('foo');

const {
	validateFranchise
} = require('../../../models/franchise');

describe('validateFranchise function', () => {
	it('should return a validated franchise object', () => {
		const data = {
			name: 'Cia da Pizza',
			shopsNumber: 1,
			userId: 1
		};
		const res = validateFranchise(data);

		expect(res.error).toBeNull();
		expect(res.value).toMatchObject(data);
	});

	it('should return an error object when missing properties', () => {
		const data = {
			name: 'Cia da Pizza',
		};
		const res = validateFranchise(data);
		expect(res.error.message).toMatch('child "shopsNumber" fails because ["shopsNumber" is required]');
	});
});