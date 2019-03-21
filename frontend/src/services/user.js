import http from './http-client'

export function getMe() {
	return http.get('/users/me');
}

export function createUser(userToCreate) {
	return http.post('/users', userToCreate);
}