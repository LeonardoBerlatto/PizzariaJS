<template>
	<div class="login">
		<div class="login-form">
			<h1>PizzariaJS</h1>
			<input
				name="email"
				placeholder="Email"
				type="email"
				v-model="user.email"
				autofocus
				required
			/>
			<input
				name="password"
				placeholder="Password"
				type="password"
				v-model="user.password"
				required
			/>
			<transition enter-active-class="animated slideInLeft" mode="out-in">
				<div class="error" v-if="error">
					<span> {{ errorMessage }} </span>
				</div>
			</transition>
			<button class="btn-submit ripple" @click="submit(user)">
				Login
			</button>
		</div>
	</div>
</template>

<script>
import { login } from '../services/auth.js';

export default {
	data() {
		return {
			user: {
				email: "",
				password: ""
			},
			errorMessage: "",
			error: false
		}
	},
	methods: {
		submit(user) {
			login(user)
				.then(res => this.loginSuccessful(res.data))
				.catch((error) => this.loginFailed(error.response));
		},
		loginSuccessful(res) {
			localStorage.setItem('auth', res.token);
			this.$router.push({ name: 'home' });
		},
		loginFailed(res) {
			this.errorMessage=res.data;
			this.error=true;
		}
	},
	created() {
		if (this.$store.state.user) {
			this.$store.state.user=null;
		}
	}
}
</script>

<style lang="scss">
	$main-green: #41b883;
	$secondary-green: #4fc08d;
	$ripple-green: #08903e;

	@mixin transition($property) {
		-webkit-transition: $property;
		transition: $property;
	}

	.login {
		height: 100vh;
		display: flex;
		align-items: center;
		justify-content: center;

		.login-form {
			display: flex;
			width: 40%;
			max-width: 350px;
			min-width: 200px;
			height: 45%;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			text-align: center;
			background-color: #fff;
			padding: 20px 40px;
			box-shadow: 0 12px 44px 0 rgba(0, 0, 0, 0.06);

			& > h1 {
				color: $main-green;
				margin-top: 0;
				margin-bottom: 42px;
			}

			input {
				border: none;
				outline: none;
				color: #212121;
				padding: 5px 2px 0 2px;
				font-size: 18px;
				border-bottom: 1px solid #a9a9a9;
				margin-bottom: 30px;
				width: 100%;
				text-align: center;
				@include transition((border-bottom, width 0.3s ease));
				&:focus {
					border-bottom: 1px solid $secondary-green;
					max-width: 120%;
					width: 120%;
				}

				&:-webkit-autofill,
				&:-webkit-autofill:hover,
				&:-webkit-autofill:focus,
				&:-webkit-autofill:active {
					box-shadow: 0 0 0 30px white inset;
				}
			}

			.error {
				color: #f44336;
				margin-bottom: 30px;
				font-weight: bold;
			}

			.btn-submit {
				outline: none;
				border: none;
				background-color: $main-green;
				color: #fff;
				cursor: pointer;
				line-height: 20px;
				font-size: 20px;
				padding: 0.6rem 1rem;
				border-radius: 20px;
			}

			.ripple {
				background-position: center;
				@include transition(background 0.5s);

				&:hover {
					background: $ripple-green
						radial-gradient(circle, transparent 1%, $ripple-green 1%)
						center/15000%;
				}
				&:active {
					background-color: $secondary-green;
					background-size: 100%;
					@include transition(background 0s);
				}
			}
		}
	}
</style>
