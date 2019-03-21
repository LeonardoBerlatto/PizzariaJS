import http from './http-client'

export async function getFlavorsFromUserFranchise(id) {
	let franchises = await http.get(`/franchises/user/${id}`);
	franchises = franchises.data;
	return http.get(`flavors/franchise/${franchises[0].id}`);
}