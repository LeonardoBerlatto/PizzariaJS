import http from './http-client'

export function login(userToLogin) {
	return http.post('/auth', userToLogin);
}

export function checkLogin() {
	return !!localStorage.getItem('auth');
}
