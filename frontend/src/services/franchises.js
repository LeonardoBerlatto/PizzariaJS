import http from './http-client'

export function getFranchisesFromUser() {
	return http.get(`/franchises/`);
}

export function getFranchiseById(id) {
	return http.get(`/franchises/${id}`);
}

export function createFranchise(data) {
	data.shopsNumber = Number.parseInt(data.shopsNumber);

	console.log(data);
	return http.post('/franchises/',
		data
	);
}

export function updateFranchise(id,data) {
	data.shopsNumber = Number.parseInt(data.shopsNumber);

	console.log(data);
	return http.patch(`/franchises/${id}`,
		data
	);
}


export function deleteFranchise(id) {
	return http.delete(`/franchises/${id}`);
}