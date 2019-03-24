import http from './http-client'

export function getProductById(id) {
	return http.get(`/products/${id}`);
}

export function createProduct(data, franchiseId) {
	data.defaultPrice = Number.parseFloat(data.defaultPrice);
	data.franchiseId = franchiseId;
	data.type = data.type.toLocaleLowerCase();
	return http.post('/products', data);
}

export function updateProduct(id, data) {
	data.defaultPrice = Number.parseFloat(data.defaultPrice);
	data.type = data.type.toLocaleLowerCase();
	return http.patch(`/products/${id}`, data);
}

export function deleteProduct(id) {
	return http.delete(`/products/${id}`);
}