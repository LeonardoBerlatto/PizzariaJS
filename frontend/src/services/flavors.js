import http from './http-client'

export function getFlavorById(id) {
	return http.get(`/flavors/${id}`);
}

export function createFlavor(data, franchiseId) {
	data.defaultPrice = Number.parseFloat(data.defaultPrice);
	data.franchiseId = franchiseId;
	return http.post('/flavors', data);
}

export function updateFlavor(id, data) {
	data.defaultPrice = Number.parseFloat(data.defaultPrice);
	data.type = data.type.toLocaleLowerCase();
	return http.patch(`/flavors/${id}`, data);
}

export function deleteFlavor(id) {
	return http.delete(`/flavors/${id}`);
}