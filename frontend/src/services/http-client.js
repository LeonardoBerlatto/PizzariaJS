import axios from 'axios';

const client = axios.create({
	baseURL: 'http://127.0.0.1:9000/api',
	headers: {
		'Content-Type': 'application/json',
		'Authorization': 'Bearer '+ localStorage.getItem('auth')
	}
});

export default client;