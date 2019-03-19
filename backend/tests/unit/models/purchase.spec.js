require('mysql2/node_modules/iconv-lite').encodingExists('foo');
const { validatePurchase } = require('../../../models/purchase');

describe('validatePurchase function', () => {
	it('should return a validated purchase object', () => {
		const data = {
			totalPrice: 20.00,
			userId: 1,
			franchiseId: 1
		};
		const res = validatePurchase(data);

		expect(res.error).toBeNull();
		expect(res.value).toMatchObject(data);
	});

	it('should return an error object when missing properties', () => {
		const data = {
			totalPrice: 20.00,
			userId: 1
		};
		const res = validatePurchase(data);
		expect(res.error.message).toMatch('child "franchiseId" fails because ["franchiseId" is required]');
	});
});