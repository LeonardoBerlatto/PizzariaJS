import Vue from 'vue'
import {
	checkLogin
} from './services/auth';
import Router from 'vue-router'
import Home from './views/Home.vue'
import Welcome from './views/Welcome.vue'
import FranchiseList from './views/FranchiseList.vue'
import RegisterUser from './views/RegisterUser.vue'

Vue.use(Router)

export default new Router({
	mode: 'history',
	base: process.env.BASE_URL,
	routes: [{
			path: '/',
			component: Home,
			beforeEnter: (to, from, next) => {
				next(checkLogin);
			},
			children: [{
					path: '/',
					name: 'home',
					component: Welcome
				},
				{
					path: '/franchises',
					component: FranchiseList
				},
				{
					path: '/register',
					component: RegisterUser
				}
			]
		},
		{
			path: '/about',
			name: 'about',
			// route level code-splitting
			// this generates a separate chunk (about.[hash].js) for this route
			// which is lazy-loaded when the route is visited.
			component: () => import( /* webpackChunkName: "about" */ './views/About.vue')
		},
		{
			path: '/login',
			name: 'login',
			component: () => import( /* webpackChunkName: "about" */ './views/Login.vue')
		}
	]
})