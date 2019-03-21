import http from './http-client'

export function getFranchisesFromUser(id) {
	return http.get(`/franchises/user/${id}`);
}