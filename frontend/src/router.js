import Vue from 'vue'
import {
	checkLogin
} from './services/auth';
import Router from 'vue-router'
import Home from './views/Home.vue'
import Login from './views/Login.vue';
import Welcome from './views/Welcome.vue'
import FlavorList from './views/FlavorList.vue'
import ProductList from './views/ProductList.vue'
import UpdateProduct from './views/UpdateProduct.vue'
import UpdateFlavor from './views/UpdateFlavor.vue'
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
					path: '/flavors/:id',
					component: UpdateFlavor,
				},
				{
					path: '/products',
					component: ProductList
				},
				{
					path: '/products/:id',
					component: UpdateProduct,
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