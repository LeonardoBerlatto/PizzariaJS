require('mysql2/node_modules/iconv-lite').encodingExists('foo');

const {
	validateFlavor
} = require('../../../models/flavor');

describe('validateFlavor function', () => {
	it('should return a validated flavor object', () => {
		const data = {
			name: 'Frango',
			defaultPrice: 12.90,
			type: 'savory',
			franchiseId: 1
		};
		const res = validateFlavor(data);

		expect(res.error).toBeNull();
		expect(res.value).toMatchObject(data);
	});

	it('should return an error object when missing properties', () => {
		const data = {
			name: 'Frango',
		};
		const res = validateFlavor(data);
		expect(res.error.message).toMatch('child "defaultPrice" fails because ["defaultPrice" is required]');
	});
});