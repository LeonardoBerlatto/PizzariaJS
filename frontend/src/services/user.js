import http from './http-client'

export function getMe() {
	return http.get('/users/me');
}

export function getAll() {
	return http.get('/users/');
}

export function getUserById(id) {
	return http.get(`/users/${id}`);
}

export function createUser(userToCreate) {
	return http.post('/users', userToCreate);
}

export function updateUser(id, userToUpdate) {
	return http.patch(`/users/${id}`, userToUpdate);
}

export function deleteUser(id) {
	return http.delete(`/users/${id}`);
}