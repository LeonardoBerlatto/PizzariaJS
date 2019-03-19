require('mysql2/node_modules/iconv-lite').encodingExists('foo');
const { validateIngredient } = require('../../../models/ingredient');

describe('validateIngredient function', () => {
	it('should return a validated ingredient object', () => {
		const data = {
			name: 'Queijo',
			flavorId: 1
		};
		const res = validateIngredient(data);

		expect(res.error).toBeNull();
		expect(res.value).toMatchObject(data);
	});

	it('should return an error object when missing properties', () => {
		const data = {
			name: 'Queijo',
		};
		const res = validateIngredient(data);
		expect(res.error.message).toMatch('child "flavorId" fails because ["flavorId" is required]');
	});
});