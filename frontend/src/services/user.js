import http from './http-client'

export function getMe() {
	return http.get('/users/me');
}