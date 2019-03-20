import Vue from 'vue';
import axios from 'axios';

Vue.use({
	install(Vue) {
		Vue.prototype.$http = axios.create({
			baseURL: '192.168.0.18:9000',
		});
	}
});