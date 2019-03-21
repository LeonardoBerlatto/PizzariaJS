import Vue from 'vue'
import {
	checkLogin
} from './services/auth';
import Router from 'vue-router'
import Home from './views/Home.vue'
import Login from './views/Login.vue';
import Welcome from './views/Welcome.vue'
import FlavorList from './views/FlavorList.vue'
import FranchiseList from './views/FranchiseList.vue'
import RegisterUser from './views/RegisterUser.vue'

Vue.use(Router)

export default new Router({
	mode: 'history',
	base: process.env.BASE_URL,
	routes: [{
			path: '/',
			component: Home,
			children: [{
					path: '',
					name: 'home',
					component: Welcome,
					beforeEnter: (to, from, next) => {
						if (!checkLogin()) {
							next('/login');
						} else {
							next();
						}
					},
				},
				{
					path: '/franchises',
					component: FranchiseList
				},
				{
					path: '/flavors',
					component: FlavorList
				},
				{
					path: '/register',
					component: RegisterUser
				}
			]
		},
		{
			path: '/login',
			component: Login,
		}
	]
})