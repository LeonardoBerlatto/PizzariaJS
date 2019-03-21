<template>
	<div class="home">
		<div v-if="user" class="dashboard">
			<div class="nav">
				<div class="brand">
					<i class="material-icons icon">
						local_pizza
					</i>
					<router-link :to="{ name: 'home' }" tag="h1"
						>PizzariaJS</router-link
					>

					<router-link
						to="/franchises"
						v-if="user.userType === 'admin'"
						tag="span"
						>Franchises</router-link
					>
					<router-link
						to="/register"
						v-if="user.userType === 'admin'"
						tag="span"
						>Register a new user</router-link
					>
					<router-link
						to="/purchases"
						v-if="user.userType === 'user'"
						tag="span"
						>My Purchases</router-link
					>
					<router-link
						to="/flavors"
						v-if="user.userType === 'owner'"
						tag="span"
						>Flavors</router-link
					>
					<router-link
						to="/flavors"
						v-if="user.userType === 'owner'"
						tag="span"
						>Other products</router-link
					>
				</div>
				<div class="user-info">
					<span class="username">{{ username }}</span>
					<i @click="logout" class="material-icons icon">
						account_circle
					</i>
				</div>
			</div>
			<router-view></router-view>
		</div>
		<div v-else class="loader">
			<Loader></Loader>
		</div>
	</div>
</template>

<script>
import { getMe as getCurrentUser } from '../services/user.js';
import Loader from '../components/Loader';

export default {
	components: {
		Loader
	},
	data() {
		return {
			user: null
		}
	},
	computed: {
		username() {
			return this.$store.state.user.name;
		}
	},
	methods: {
		logout() {
			localStorage.removeItem('auth');
			this.$router.push('/login');
		}
	},
	created() {
		getCurrentUser()
			.then(res => {
				this.user=res.data;
				this.$store.state.user=res.data;
			});
	}
}
</script>

<style lang="scss">
	$main-green: #41b883;
	$secondary-green: #4fc08d;
	$ripple-green: #08903e;

	.home {
		height: 100vh;

		.dashboard {
			display: flex;
			flex-direction: column;
			width: 100%;
			height: 100%;

			.nav {
				display: flex;
				padding: 0 20px;
				color: #fff;
				width: 100%;
				height: 3.6rem;
				position: fixed;
				background-color: $main-green;
				justify-content: space-between;
				align-items: center;

				.brand {
					display: flex;
					align-items: center;

					h1 {
						cursor: pointer;
					}

					span {
						cursor: pointer;
						margin-left: 30px;
						user-select: none;
					}
				}

				.user-info {
					display: flex;
					align-items: center;
					cursor: pointer;
					justify-content: space-evenly;

					.username {
						margin-right: 10px;
					}
				}

				.icon {
					font-size: 48px;
					user-select: none;
				}
			}
		}

		.loader {
			height: 100vh;
			display: flex;
			align-items: center;
			justify-content: center;
		}
	}
</style>
